<template>
  <the-card title="Регистрация">
    <form @submit.prevent="submit">
      <AppInput
          v-for="item in FormSchema"
          :data="item"
          v-model='item.value'
          :key="item.name"
      />
      <AppInput
          :data="repeatPassword"
          v-model='repeatPassword.value'
          :key="repeatPassword.name"
          @change=""
      />
      <p class="red" v-if="user.authError">{{ user.authError }}</p>
      <app-btn type="submit">Регистрация</app-btn>
<!--      <div class="group">-->
<!--        <router-link to="/auth">Войти</router-link>-->
<!--      </div>-->
    </form>
  </the-card>
</template>

<script setup>
import TheCard from "../components/TheCard.vue";
import AppBtn from "../components/ui/AppBtn.vue";
import AppInput from "../components/ui/AppInput.vue";
import {onMounted, reactive} from "vue";
import {useUser} from "../stores/user";
import {useRouter, useRoute} from 'vue-router'
import {dataForm, submitForm} from "../utils/form";

const router = useRouter()
const route = useRoute()
const user = useUser()

const FormSchema = reactive([
  {
    name: 'login',
    value: '',
    placeholder: 'Никнейм',
    textError: '',
    listError: ['Введите логин', 'Логин не меньше 3 символов'],
    error: false,
    required: true,
    min: 3,
  }, {
    name: 'password',
    value: '',
    type: 'password',
    placeholder: 'Пароль',
    error: false,
    textError: '',
    listError: ['Введите пароль', 'Пароль не меньше 6 символов'],
    required: true,
    min: 5,
  }
])

const repeatPassword = reactive({
  name: 'password-repeat',
  value: '',
  type: 'password',
  placeholder: 'Повторите пароль',
  error: false,
  textError: '',
  listError: ['Пароли не совпадают'],
  required: true,
  min: 5,
})

onMounted(() => {
  user.authError = null
})

const submit = async () => {
  const error = submitForm(FormSchema)
  const repeat = repeatPassword.value === FormSchema[1].value

  if (!repeat) {
    repeatPassword.error = true
    repeatPassword.textError = repeatPassword.listError[0]
  } else {
    repeatPassword.error = false
  }

  if (!error && repeat) {
    const data = await user.register(dataForm(FormSchema), route.params.id)
    if (data) router.push('/')
  }
}
</script>
