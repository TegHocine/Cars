import { fakeCars } from "@/assets/constants/cars"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { CarType } from "@/types/car.type"
import {
  Car,
  FileCheck,
  Gauge,
  Search,
  Shield,
  Tag,
  Wrench,
} from "lucide-react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { AddCar } from "./add-car"

export function Cars() {
  const navigate = useNavigate()

  const [cars] = useState(fakeCars)
  const [search, setSearch] = useState("")

  const filteredCars = cars.filter((car) =>
    car.name.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className='flex-1 space-y-4 p-4 md:p-8 pt-3 md:pt-6'>
      <div className='flex items-center justify-between gap-3 mb-6 flex-wrap'>
        <h2 className='text-3xl font-bold tracking-tight'>Cars</h2>
        <div className='flex gap-3 w-full justify-end'>
          <div className='relative max-w-md w-full'>
            <Search className='absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4' />
            <Input
              className='pl-10 max-w-md'
              placeholder='Search cars...'
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <AddCar />
        </div>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 content-center'>
        {filteredCars.map((car) => (
          <CarCard
            key={car.id}
            car={car}
            onClick={() => navigate("/cars/123")}
          />
        ))}
      </div>
    </div>
  )
}

const formatDate = (dateString: string | Date) => {
  const date = new Date(dateString)
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  })
}

export function CarCard({
  car,
  onClick,
}: {
  car: CarType
  onClick: () => void
}) {
  return (
    <Card className='w-full max-w-md mx-auto overflow-hidden transition-all duration-300 hover:shadow-lg'>
      <CardHeader className='p-4'>
        <div className='flex justify-between items-center'>
          <CardTitle className='text-xl font-bold'>{car.name}</CardTitle>
          <Car className='h-6 w-6' />
        </div>
        <div className='flex justify-between items-center'>
          <p className='text-sm text-muted-foreground'>Year: {car.year}</p>
          <div className='flex items-center justify-between gap-3'>
            <div className='flex items-center'>
              <Gauge className='h-5 w-5 mr-2 text-primary' />
              <span className='text-sm'>Km:</span>
            </div>
            <Badge variant='secondary'>{car.km.toLocaleString()} km</Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent className='p-4'>
        <div className='space-y-2'>
          <div className='flex items-center justify-between'>
            <div className='flex items-center'>
              <Wrench className='h-5 w-5 mr-2 text-primary' />
              <span className='text-sm'>Last Maintenance:</span>
            </div>
            <Badge variant='secondary'>{formatDate(car.maintenanceDate)}</Badge>
          </div>
          <div className='flex items-center justify-between'>
            <div className='flex items-center'>
              <Shield className='h-5 w-5 mr-2 text-primary' />
              <span className='text-sm'>Insurance</span>
            </div>
            <Badge variant='secondary'>{formatDate(car.insuranceDate)}</Badge>
          </div>
          <div className='flex items-center justify-between'>
            <div className='flex items-center'>
              <FileCheck className='h-5 w-5 mr-2 text-primary' />
              <span className='text-sm'>Inspection</span>
            </div>
            <Badge variant='secondary'>{formatDate(car.inspectionDate)}</Badge>
          </div>
          <div className='flex items-center justify-between'>
            <div className='flex items-center'>
              <Tag className='h-5 w-5 mr-2 text-primary' />
              <span className='text-sm'>Vignette</span>
            </div>
            <Badge variant='secondary'>{formatDate(car.vignetteDate)}</Badge>
          </div>
        </div>
      </CardContent>
      <CardFooter className='p-4 flex justify-between'>
        <Button
          variant='outline'
          className='flex-1 mr-2'
          onClick={() => onClick()}>
          Detail
        </Button>
      </CardFooter>
    </Card>
  )
}
