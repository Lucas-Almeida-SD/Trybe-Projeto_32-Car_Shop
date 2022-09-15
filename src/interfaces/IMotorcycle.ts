import { z } from 'zod';
import { vehicleZodSchema } from './IVehicle';

const motorcycleZodSchema = vehicleZodSchema.extend({
  category: z.enum(['Street', 'Custom', 'Trail']),
  engineCapacity: z.number().int().lte(0).gte(2500),
});

type IMotorcycle = z.infer<typeof motorcycleZodSchema>;

export {
  motorcycleZodSchema,
  IMotorcycle,
};