#!/usr/bin/env node

// Import Large Vehicle records from DataSF and upsert into the database
import '../config.js';
import prisma from '../prisma/client.js';

const SOURCE_URL = 'https://data.staff.sf.gov/resource/7hhb-3znd.json';

// Utility: sleep for ms
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Normalize keys: lower-case and remove non-alphanumerics for flexible lookup
const normalizeKey = (s) => String(s || '')
  .toLowerCase()
  .replace(/[^a-z0-9]+/g, ' ')
  .trim()
  .replace(/\s+/g, ' ');

// Get a field value from a record using multiple candidate names (case/format-insensitive)
function getField (record, candidates) {
  if (!record || typeof record !== 'object') return undefined;
  const map = new Map();
  for (const [k, v] of Object.entries(record)) {
    map.set(normalizeKey(k), v);
  }
  for (const name of candidates) {
    const v = map.get(normalizeKey(name));
    if (v !== undefined) return v;
  }
  return undefined;
}

function toBoolean (v) {
  if (typeof v === 'boolean') return v;
  if (v == null) return null;
  const s = String(v).toLowerCase();
  if (['true', 't', '1', 'yes', 'y'].includes(s)) return true;
  if (['false', 'f', '0', 'no', 'n'].includes(s)) return false;
  return null;
}

function toDate (v) {
  if (!v) return null;
  const d = new Date(v);
  return isNaN(d.getTime()) ? null : d;
}

// Map a Socrata record into our Prisma LargeVehicle data shape
function mapLargeVehicle (rec) {
  // Try a variety of likely field names from the dataset
  const reportingDate = getField(rec, ['reporting date', 'reporting_date', 'reportingdate', 'report date']);
  const vehicleId = getField(rec, ['vehicle id', 'vehicle_id', 'vehicleid', 'vin', 'unique vehicle id']);
  const wasVehicleInAudit = getField(rec, ['was vehicle in audit', 'in audit', 'audited', 'was_in_audit']);
  const isEligibleForPermit = getField(rec, ['is eligible for permit', 'eligible for permit', 'permit_eligible', 'permit_eligible']);
  const licensePlateNumber = getField(rec, ['license plate number', 'plate', 'license_plate', 'license plate']);
  const licensePlateState = getField(rec, ['license plate state', 'plate state', 'state']);

  const dataAsOf = getField(rec, ['data as of', 'data_as_of', 'data asof']);
  const dataLoadedAt = getField(rec, ['data loaded at', 'data_loaded_at', 'loaded at']);

  const now = new Date();

  return {
    reportingDate: toDate(reportingDate) || now,
    vehicleId: vehicleId ? String(vehicleId) : undefined,
    wasVehicleInAudit: toBoolean(wasVehicleInAudit) ?? false,
    isEligibleForPermit: toBoolean(isEligibleForPermit) ?? false,
    licensePlateNumber: licensePlateNumber ? String(licensePlateNumber) : null,
    licensePlateState: licensePlateState ? String(licensePlateState) : null,
    dataAsOf: toDate(dataAsOf) || now,
    dataLoadedAt: toDate(dataLoadedAt) || now
  };
}

async function fetchPage ({ limit, offset, retries = 3 }) {
  const url = new URL(SOURCE_URL);
  url.searchParams.set('$limit', String(limit));
  url.searchParams.set('$offset', String(offset));

  const credentials = Buffer.from(`${process.env.SOCRATA_API_KEY_ID}:${process.env.SOCRATA_API_KEY_SECRET}`).toString('base64');

  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const res = await fetch(url, {
        headers: {
          Authorization: `Basic ${credentials}`
        }
      });
      if (!res.ok) {
        throw new Error(`HTTP ${res.status} ${res.statusText}`);
      }
      const json = await res.json();
      // v3 query.json sometimes returns { data: [...]} or array directly
      const rows = Array.isArray(json) ? json : (json?.data || json?.rows || []);
      // Rows might be objects already; if not, try to parse
      return rows;
    } catch (err) {
      const backoff = Math.min(30000, 500 * 2 ** (attempt - 1));
      if (attempt === retries) throw err;
      console.warn(`Fetch attempt ${attempt} failed: ${err?.message || err}. Retrying in ${backoff}ms...`);
      await sleep(backoff);
    }
  }
  return [];
}

async function upsertLargeVehicle (data) {
  if (!data?.vehicleId) return; // skip if no unique id
  const where = { vehicleId: data.vehicleId };
  const payload = {
    reportingDate: data.reportingDate,
    wasVehicleInAudit: data.wasVehicleInAudit,
    isEligibleForPermit: data.isEligibleForPermit,
    licensePlateNumber: data.licensePlateNumber,
    licensePlateState: data.licensePlateState,
    dataAsOf: data.dataAsOf,
    dataLoadedAt: data.dataLoadedAt
  };
  await prisma.largeVehicle.upsert({
    where,
    update: payload,
    create: { vehicleId: data.vehicleId, ...payload }
  });
}

async function main () {
  const pageSize = Number(process.env.IMPORT_PAGE_SIZE || 1000);
  let offset = Number(process.env.IMPORT_OFFSET || 0);
  let totalImported = 0;

  console.log(`Starting import from ${SOURCE_URL} with page size ${pageSize}...`);

  while (true) {
    const rows = await fetchPage({ limit: pageSize, offset });
    if (!rows || rows.length === 0) break;

    // Rows from Socrata v3 may be arrays with columns metadata; attempt to coerce to objects
    let objects = rows;
    if (Array.isArray(rows) && rows.length > 0 && Array.isArray(rows[0])) {
      // If metadata exists, it may be provided elsewhere, but we don't have it here via this endpoint usage.
      // In that case, just skip as we can't map reliably.
      console.warn('Received array rows without field names; consider switching to SODA /resource endpoint or adding select clauses. Attempting best-effort mapping.');
      objects = rows.map((arr) => {
        // best-effort: turn into object with numeric keys
        const obj = {};
        arr.forEach((v, i) => { obj[`col_${i + 1}`] = v; });
        return obj;
      });
    }

    let batch = 0;
    for (const rec of objects) {
      try {
        const data = mapLargeVehicle(rec);
        if (!data.vehicleId) {
          continue;
        }
        await upsertLargeVehicle(data);
        totalImported++;
        batch++;
      } catch (err) {
        console.error('Failed to upsert record:', err);
      }
    }

    console.log(`Imported ${batch} records (offset ${offset}). Total so far: ${totalImported}`);
    if (rows.length < pageSize) break;
    offset += pageSize;
  }

  console.log(`Import complete. Total records processed: ${totalImported}`);
}

// Execute and ensure Prisma disconnect
main()
  .catch((err) => {
    console.error('Import failed:', err);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
