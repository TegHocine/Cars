import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Status, Task } from "@/types/car-tasks.type"
import { Pencil2Icon } from "@radix-ui/react-icons"
import { CheckCircle, Circle, Clock } from "lucide-react"
import { Badge } from "./ui/badge"
import { Button } from "./ui/button"

interface TasksTableProps {
  tasks: Task[]
  onEditClick: (task: Task) => void
}

const getStatusBadge = (status: Status) => {
  switch (status) {
    case "todo":
      return {
        badgeClass: "text-gray-900 bg-gray-200",
        icon: <Circle className='h-4 w-4' />,
      }
    case "in-progress":
      return {
        badgeClass: "text-yellow-900 bg-yellow-200",
        icon: <Clock className='h-4 w-4' />,
      }
    case "done":
      return {
        badgeClass: "text-teal-900 bg-teal-200",
        icon: <CheckCircle className='h-4 w-4' />,
      }
  }
}

export const CarTaskTable = ({ tasks, onEditClick }: TasksTableProps) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Description</TableHead>
          <TableHead>Maintenance Type</TableHead>
          <TableHead>KM</TableHead>
          <TableHead>Price</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {tasks.map((task) => {
          const { badgeClass, icon } = getStatusBadge(task.status)
          return (
            <TableRow key={task.id}>
              <TableCell className='whitespace-pre-wrap font-semibold'>
                {task.description}
              </TableCell>
              <TableCell>{task.maintenanceType}</TableCell>
              <TableCell>{task.km}</TableCell>
              <TableCell>{task.price} DA</TableCell>
              <TableCell>{new Date(task.date).toLocaleDateString()}</TableCell>
              <TableCell>
                <Badge className={`${badgeClass} pointer-events-none gap-1`}>
                  {icon}
                  {task.status}
                </Badge>
              </TableCell>
              <TableCell>
                <Button
                  size='icon'
                  variant='ghost'
                  onClick={() => onEditClick(task)}>
                  <Pencil2Icon className='w-8 h-8' />
                </Button>
              </TableCell>
            </TableRow>
          )
        })}
      </TableBody>
    </Table>
  )
}
