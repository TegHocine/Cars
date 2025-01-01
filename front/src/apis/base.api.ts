import { getFromLocalStorage } from "@/lib/utils"
import axios from "axios"

const api = axios.create({
  baseURL: "/api/v1",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
})

// Request Interceptor
api.interceptors.request.use(
  (config) => {
    const storedToken = getFromLocalStorage("token")
    if (storedToken) {
      config.headers["Authorization"] = `Bearer ${storedToken}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

// Response Interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Uncomment the below section to handle 401 errors
    // if (error?.response?.status === 401) {
    //     localStorage.removeItem("token");
    //     localStorage.removeItem("user");
    //     window.location.href = "/login";
    // }
    return Promise.reject(error)
  }
)

export { api }
