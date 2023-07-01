import axios from "axios";
import router from '@/router'
import { AppStorage } from "@/auth/AppStorage";
const { getToken } = AppStorage();
const AxiosGlobal = axios.create({
  baseURL: import.meta.env.VITE_BASE_API_URL,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  },
})

AxiosGlobal.interceptors.request.use(config => {
  const token = localStorage.getItem('token')

  if (token) {
    config.headers = config.headers || {}
    config.headers.Authorization = token ? `Bearer ${getToken()}` : ''
  }

  return config
})

AxiosGlobal.interceptors.response.use(response => {
  return response
}, error => {
  if (error.response.status === 401) {
    localStorage.removeItem('user')
    localStorage.removeItem('token')

    router.push('/login')
  }
  else {
    return Promise.reject(error)
  }
})

export default AxiosGlobal;


