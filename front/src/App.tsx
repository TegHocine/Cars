import { Cars } from "@/app/cars/cars"
import { CarMaintenance } from "@/app/cars/maintenance/car-maintenance"
import Dashboard from "@/app/dashboard/dashboard"
import RootLayout from "@/app/RootLayout"
import { Toaster } from "@/components/ui/sonner"
import { createBrowserRouter, RouterProvider } from "react-router-dom"

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: "cars",
        children: [
          { index: true, element: <Cars /> },
          { path: ":carId", element: <CarMaintenance /> },
        ],
      },
    ],
  },
  {
    path: "/login",
    element: <Dashboard />,
  },
  {
    path: "/register",
    element: <Dashboard />,
  },
])

function App() {
  return (
    <>
      <RouterProvider router={router} />
      <Toaster />
    </>
  )
}

export default App
