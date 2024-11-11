import { fakeTasks } from "@/assets/constants/car-tasks"
import { CarTaskTable } from "@/components/car-task-table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { MaintenanceType, Status, Task } from "@/types/car-tasks.type"

import { useState } from "react"
import { AddTask } from "./add-task"
import { EditTask } from "./edit-task"

export function CarMaintenance() {
  const [tasks, setTasks] = useState<Task[]>(fakeTasks)

  const [filterType, setFilterType] = useState<MaintenanceType | "all">("all")
  const [filterStatus, setFilterStatus] = useState<Status | "all">("all")

  const [open, setOpen] = useState(false)
  const [selectedTask, setSelectedTask] = useState<Task | null>(null)

  const filteredTasks = tasks.filter(
    (task) =>
      (filterType === "all" || task.maintenanceType === filterType) &&
      (filterStatus === "all" || task.status === filterStatus)
  )

  return (
    <>
      <div className='flex-1 space-y-4 p-4 md:p-8 pt-3 md:pt-6'>
        <div className='flex items-end justify-between flex-wrap gap-3'>
          <div className='flex flex-wrap gap-3 items-end'>
            <div className='w-full md:w-96'>
              <Label htmlFor='filterType'>Maintenance Type</Label>
              <Select
                value={filterType}
                onValueChange={(value: MaintenanceType | "all") =>
                  setFilterType(value)
                }>
                <SelectTrigger>
                  <SelectValue placeholder='Filter by type' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='all'>All</SelectItem>
                  <SelectItem value='oil/filter change'>
                    Oil/Filter Change
                  </SelectItem>
                  <SelectItem value='reparation'>Reparation</SelectItem>
                  <SelectItem value='other'>Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className='w-full md:w-96'>
              <Label htmlFor='filterStatus'>Status</Label>
              <Select
                value={filterStatus}
                onValueChange={(value: Status | "all") =>
                  setFilterStatus(value)
                }>
                <SelectTrigger>
                  <SelectValue placeholder='Filter by status' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='all'>All</SelectItem>
                  <SelectItem value='todo'>Todo</SelectItem>
                  <SelectItem value='in-progress'>In Progress</SelectItem>
                  <SelectItem value='done'>Done</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <AddTask setTasks={setTasks} />
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Tasks</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className='space-y-4'>
              <CarTaskTable
                tasks={filteredTasks}
                onEditClick={(value) => {
                  setOpen(true)
                  setSelectedTask(value)
                }}
              />
            </ul>
          </CardContent>
        </Card>
      </div>

      {selectedTask ? (
        <EditTask
          onOpenChange={setOpen}
          open={open}
          task={selectedTask}
        />
      ) : null}
    </>
  )
}
