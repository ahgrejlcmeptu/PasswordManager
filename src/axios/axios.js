import axios from 'axios'
import {createPinia, setActivePinia} from "pinia"
import router from "../router";

const pinia = createPinia();
setActivePinia(pinia);
import {useUser} from "../stores/user";

const user = useUser()

const baseAxios = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
})

baseAxios.interceptors.request.use(async config => {
  const token = localStorage.getItem(import.meta.env.VITE_TOKEN_KEY)
  config.headers.Authorization = `Bearer ${token}`
  return config
})

baseAxios.interceptors.response.use(null, async (error) => {
  const originalRequest = error.config;
  if (error.response.status == 401 && error.config && !error.config._isRetry) {
    originalRequest._isRetry = true;
    try {
      await user.refresh()
      return baseAxios.request(originalRequest);
    } catch (e) {
      await user.logout()
      router.push('/auth?message=auth')
    }
  }
  throw error;
})

export default baseAxios
