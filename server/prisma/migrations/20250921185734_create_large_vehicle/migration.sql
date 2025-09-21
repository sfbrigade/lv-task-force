-- CreateTable
CREATE TABLE "public"."LargeVehicle" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "reportingDate" TIMESTAMP(3) NOT NULL,
    "vehicleId" TEXT NOT NULL,
    "wasVehicleInAudit" BOOLEAN NOT NULL,
    "licensePlateNumber" TEXT,
    "licensePlateState" TEXT,
    "vehicleMake" TEXT,
    "vehicleModel" TEXT,
    "vehicleColor" TEXT,
    "firstLocationRaw" JSONB,
    "firstLocationLongitude" DECIMAL(65,30),
    "firstLocationLatitude" DECIMAL(65,30),
    "firstLocation" JSONB,
    "firstPoliceDistrict" TEXT,
    "firstAnalysisNeighborhood" TEXT,
    "firstSupervisorDistrict" TEXT,
    "dataAsOf" TIMESTAMP(3) NOT NULL,
    "dataLoadedAt" TIMESTAMP(3) NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "LargeVehicle_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "LargeVehicle_vehicleId_key" ON "public"."LargeVehicle"("vehicleId");
