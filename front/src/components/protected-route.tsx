import { useAuth } from "@/contexts/auth-context"
import { Navigate } from "react-router-dom"

export type ProtectedRouteProps = {
  children: React.ReactNode
  to: string
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  to,
}) => {
  const { token } = useAuth()

  if (token) return <>{children}</>

  return (
    <Navigate
      to={to}
      replace
      key='protected-route-redirect'
    />
  )
}
