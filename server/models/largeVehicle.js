import { Prisma } from '@prisma/client';
import { z } from 'zod';

import Base from './base.js';

const LargeVehicleAttributesSchema = z.object({
  reportingDate: z.coerce.date(),
  vehicleId: z.string(),
  wasVehicleInAudit: z.boolean(),
  licensePlateNumber: z.string().nullable().optional(),
  licensePlateState: z.string().nullable().optional(),
  dataAsOf: z.coerce.date(),
  dataLoadedAt: z.coerce.date(),
});

const LargeVehicleResponseSchema = LargeVehicleAttributesSchema.extend({
  id: z.string().uuid(),
  updatedAt: z.coerce.date(),
  createdAt: z.coerce.date(),
});

class LargeVehicle extends Base {
  static AttibutesSchema = LargeVehicleAttributesSchema;
  static ResponseSchema = LargeVehicleResponseSchema;

  constructor (data) {
    super(Prisma.LargeVehicleScalarFieldEnum, data);
  }
}

export { LargeVehicle };

export default LargeVehicle;
