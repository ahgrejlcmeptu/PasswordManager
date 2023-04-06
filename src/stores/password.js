import {ref} from 'vue'
import {defineStore} from 'pinia'
import baseAxios from "../axios/axios";
import {useUser} from "./user";

const URL_NAME = 'password'

export const usePassword = defineStore('password', () => {
  const passwords = ref({})
  const user = useUser()

  const load = async () => {
    passwords.value = {}
    try {
      const {data} = await baseAxios.get(`${URL_NAME}/${user.user.id}`)
      data.forEach(item => {
        passwords.value[item._id] = item
      })
    } catch (e) {
      console.log(e)
    }
  }

  const create = async (item) => {
    try {
      const {data} = await baseAxios.put(`${URL_NAME}/create`, {
        ...item,
        user: user.user.id
      })
      passwords.value[data.item._id] = data.item
      console.log(data.message)
      return data
    } catch (e) {
      console.log(e)
    }
  }

  const update = async (item) => {
    try {
      const {data} = await baseAxios.post(`${URL_NAME}/${item._id}`, item)
      passwords.value[data.item._id] = data.item
      return data
    } catch (e) {
      console.log(e)
    }
  }

  const remove = async (id) => {
    try {
      const {data} = await baseAxios.delete(`${URL_NAME}/${id}`)
      delete passwords.value[id]
      console.log(data.message)
      return data
    } catch (e) {
      console.log(e)
    }
  }

  return {create, update, remove, load, passwords}
})
