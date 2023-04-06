import {ref} from 'vue'
import {defineStore} from 'pinia'
import baseAxios from "../axios/axios";
const URL_NAME = 'registration'

export const useRegistration = defineStore('registration', () => {

  const keys = ref([])

  const create = async () => {
    // if (!user.value.isAdmin && !users.value.length) return
    try {
      const {data} = await baseAxios.put(`${URL_NAME}/create`)
      console.log(data.message)
      keys.value.push(data.item)
    } catch (e) {
      console.log(e)
    }
  }

  const load = async () => {
    // if (!user.value.isAdmin && !users.value.length) return
    try {
      const {data} = await baseAxios.get(`${URL_NAME}/`)
      console.log(data)
      keys.value = data
    } catch (e) {
      console.log(e)
    }
  }

  return {load, create, keys}
})
