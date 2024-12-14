import { Login } from "@/app/auth/login"
import { Cars } from "@/app/cars/cars"
import { CarMaintenance } from "@/app/cars/maintenance/car-maintenance"
import { Dashboard } from "@/app/dashboard/dashboard"
import { RootLayout } from "@/app/RootLayout"
import { Toaster } from "@/components/ui/sonner"
import { MutationCache, QueryClient, QueryClientProvider } from "react-query"
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
    element: <Login />,
  },
  {
    path: "/register",
    element: <Dashboard />,
  },
])

// Create a client
const queryClient = new QueryClient({
  mutationCache: new MutationCache({
    onSuccess: () => {
      queryClient.invalidateQueries()
    },
  }),
})

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        <Toaster />
      </QueryClientProvider>
    </>
  )
}

export default App
