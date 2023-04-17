import {computed, ref} from 'vue'
import {defineStore} from 'pinia'
import baseAxios from "../axios/axios";
const URL_NAME = 'user'

export const useUser = defineStore('user', () => {
  const token = ref(localStorage.getItem(import.meta.env.VITE_TOKEN_KEY))
  const refreshToken = ref(localStorage.getItem(import.meta.env.VITE_REFRESH_KEY))
  const user = ref(JSON.parse(localStorage.getItem(import.meta.env.VITE_USER_KEY)) || {})
  const users = ref([])

  const authError = ref(null)

  const login = async (form) => {
    try {
      const {data} = await baseAxios.post(`${URL_NAME}/login`, form)
      saveUser(data)
      console.log(data)
      return data
    } catch (e) {
      authError.value = e.response.data.message
      console.log(authError.value)
      console.error(e)
    }
  }

  const logout = async () => {
    try {
      const {data} = await baseAxios.post(`${URL_NAME}/logout`, {refreshToken: refreshToken.value})
      user.value = {}
      localStorage.removeItem(import.meta.env.VITE_TOKEN_KEY)
      localStorage.removeItem(import.meta.env.VITE_REFRESH_KEY)
      localStorage.removeItem(import.meta.env.VITE_USER_KEY)
      console.log(data)
    } catch (e) {
      authError.value = e.response.data.message
      console.error(e)
    }
  }

  const register = async (form, id) => {
    try {
      const {data} = await baseAxios.post(`${URL_NAME}/registration/${id}`, form)
      saveUser(data)
      console.log(data)
      return data
    } catch (e) {
      authError.value = e.response.data.message
      console.error(e)
    }
  }

  const registerFirst = async (form) => {
    try {
      const {data} = await baseAxios.post(`${URL_NAME}/registrationFirst/`, form)
      console.log(data)
      saveUser(data)
      return data
    } catch (e) {
      authError.value = e.response.data.message
      console.error(e)
    }
  }

  const refresh = async () => {
    const {data} = await baseAxios.post(`${URL_NAME}/refresh`, {refreshToken: refreshToken.value})

    token.value = data.accessToken
    localStorage.setItem(import.meta.env.VITE_TOKEN_KEY, data.accessToken)
    console.log('refresh', data)
  }

  const saveUser = (data) => {
    token.value = data.user.accessToken
    refreshToken.value = data.user.refreshToken
    user.value = data.user
    authError.value = null

    localStorage.setItem(import.meta.env.VITE_TOKEN_KEY, data.user.accessToken)
    localStorage.setItem(import.meta.env.VITE_REFRESH_KEY, data.user.refreshToken)
    localStorage.setItem(import.meta.env.VITE_USER_KEY, JSON.stringify(data.user))
  }

  const load = async () => {
    if (!user.value.isAdmin && !users.value.length) return
    try {
      const {data} = await baseAxios.get(`${URL_NAME}/`)
      console.log(data)
      users.value = data
    } catch (e) {
      console.log(e)
    }
  }

  const isAdmin = computed(() => user.value.isAdmin)

  return {user, authError, users, isAdmin, login, logout, refresh, load, register, registerFirst}
})
