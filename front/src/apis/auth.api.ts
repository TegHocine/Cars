import { LoginType, SignupType, TokenType } from "@/types/auth.type"
import { api } from "./base.api"

export const login = async (loginData: LoginType): Promise<TokenType> => {
  const res = await api.post("/auth/login", loginData)
  return res.data
}

export const signup = async (registerData: SignupType) => {
  const res = await api.post("/auth/signup", registerData)
  return res.data
}
