import { Task } from "@/types/car-tasks.type"

export const maintenanceTypeOptions = [
  "oil/filter change",
  "reparation",
  "other",
]
export const statusOptions = ["todo", "in-progress", "done"]

export const fakeTasks: Task[] = [
  {
    id: "db4b3d45",
    description: "Sedan - Oil Change",
    maintenanceType: "oil/filter change",
    km: 75000,
    price: 120.0,
    date: new Date(),
    status: "done",
  },
  {
    id: "e69c7f5e",
    description: "SUV - Tire Rotation",
    maintenanceType: "reparation",
    km: 150000,
    price: 75.0,
    date: new Date(),
    status: "in-progress",
  },
  {
    id: "e69c7f5e2",
    description: "SUV - Tire Rotation",
    maintenanceType: "reparation",
    km: 150000,
    price: 75.0,
    date: new Date(),
    status: "todo",
  },
]
