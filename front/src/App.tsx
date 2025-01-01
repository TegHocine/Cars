import { LoginPage } from "@/app/auth/login"
import { SignupPage } from "@/app/auth/signup"
import { Cars } from "@/app/cars/cars"
import { CarMaintenance } from "@/app/cars/maintenance/car-maintenance"
import { Dashboard } from "@/app/dashboard/dashboard"
import { RootLayout } from "@/app/RootLayout"
import { ProtectedRoute } from "@/components/protected-route"
import { Toaster } from "@/components/ui/toaster"
import { AuthProvider } from "@/contexts/auth-context"
import {
  MutationCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query"
import { createBrowserRouter, RouterProvider } from "react-router-dom"

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute
        to='/login'
        children={<RootLayout />}
      />
    ),
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
    element: <LoginPage />,
  },
  {
    path: "/signup",
    element: <SignupPage />,
  },
])

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
        <AuthProvider>
          <RouterProvider router={router} />
        </AuthProvider>
        <Toaster />
      </QueryClientProvider>
    </>
  )
}

export default App
