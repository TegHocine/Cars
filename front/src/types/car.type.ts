import { z } from "zod"

export const carSchema = z.object({
  id: z.string(),
  name: z.string(),
  year: z.string(),
  km: z.number(),
  maintenanceDate: z.coerce.date(),
  insuranceDate: z.coerce.date(),
  inspectionDate: z.coerce.date(),
  vignetteDate: z.coerce.date(),
})

export type CarType = z.infer<typeof carSchema>

export const createCarSchema = z.object({
  name: z.string(),
  year: z.string(),
  km: z.number(),
  maintenanceDate: z.coerce.date(),
  insuranceDate: z.coerce.date(),
  inspectionDate: z.coerce.date(),
  vignetteDate: z.coerce.date(),
})

export type CreateCarType = z.infer<typeof createCarSchema>
