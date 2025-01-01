import {
  getFromLocalStorage,
  removeFromLocalStorage,
  saveToLocalStorage,
} from "@/lib/utils"
import { TokenType } from "@/types/auth.type"
import { ReactNode, createContext, useContext, useState } from "react"

type AuthContext = {
  token: TokenType | undefined
  //   loading: boolean
  onLogin: (token: TokenType) => void
  onLogout: () => void
}

const AuthContext = createContext({} as AuthContext)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<AuthContext["token"]>(
    getFromLocalStorage<AuthContext["token"]>("token")
  )

  //   const { data, isLoading: loading } = useQuery({
  //     queryKey: ["getMyProfile"],
  //     queryFn: getMyProfile,
  //     enabled: !!getFromLocalStorage( "token"), // Query only if token exists
  //   })

  const onLogin = (newToken: AuthContext["token"]) => {
    if (newToken) {
      saveToLocalStorage("token", newToken)
      setToken(newToken)
    } else {
      onLogout()
    }
  }

  const onLogout = () => {
    removeFromLocalStorage("token")
    setToken(undefined)
  }

  return (
    <AuthContext.Provider
      value={{
        token,
        onLogin,
        onLogout,
      }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
