import axios from "axios"

const API_SERVER = " http://127.0.0.1:8000/"

const backend = axios.create({
  baseURL: API_SERVER,
  withCredentials: true,
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
  },
})

backend.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("jwt")
    if (token) {
      config.headers.authorization = "Bearer " + localStorage.getItem("jwt")
    }
    return config
  },
  (error) => Promise.reject(error)
)

export default backend
