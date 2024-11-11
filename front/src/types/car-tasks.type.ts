import { z } from "zod"

export const maintenanceTypeSchema = z.union([
  z.literal("oil/filter change"),
  z.literal("reparation"),
  z.literal("other"),
])
export type MaintenanceType = z.infer<typeof maintenanceTypeSchema>

export const statusSchema = z.union([
  z.literal("todo"),
  z.literal("in-progress"),
  z.literal("done"),
])
export type Status = z.infer<typeof statusSchema>

export const taskSchema = z.object({
  id: z.string(),
  description: z.string(),
  maintenanceType: maintenanceTypeSchema,
  km: z.number(),
  price: z.number(),
  date: z.coerce.date(),
  status: statusSchema,
})
export type Task = z.infer<typeof taskSchema>

export const createTaskSchema = taskSchema.omit({ id: true })
export type CreateTask = z.infer<typeof createTaskSchema>
