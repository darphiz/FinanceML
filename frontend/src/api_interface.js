import axios from "axios"

const token = localStorage.getItem("jwt") || ""

const API_SERVER = " http://127.0.0.1:8000/"

export const backend = axios.create({
  baseURL: API_SERVER,
  withCredentials: true,
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
    Authorization: `JWT ${token}`,
  },
})
