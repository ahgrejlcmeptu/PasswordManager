<template>
  <the-card title="Менеджер паролей">
    <form @submit.prevent="submit">
      <AppInput
          v-for="item in FormSchema"
          :data="item"
          v-model='item.value'
          :key="item.name"
      />
      <p class="red" v-if="user.authError">{{ user.authError }}</p>
      <app-btn type="submit">Войти</app-btn>
      <div class="group">
        <!--        <a href="#">Forget Password</a>-->
<!--        <router-link to="/signup">Регистрация</router-link>-->
      </div>
    </form>
  </the-card>
</template>

<script setup>
import TheCard from "../components/TheCard.vue";
import AppBtn from "../components/ui/AppBtn.vue";
import AppInput from "../components/ui/AppInput.vue";
import {onMounted, reactive, ref} from "vue";
import {useUser} from "../stores/user";
import {submitForm, dataForm} from "../utils/form";
import {useRouter} from 'vue-router'

const router = useRouter()
const user = useUser()

const FormSchema = reactive({
  login: {
    name: 'login',
    value: '',
    placeholder: 'Никнейм',
    textError: '',
    listError: ['Введите логин', 'Логин не меньше 3 символов'],
    error: false,
    required: true,
    min: 3,
  },
  password: {
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
})


onMounted(() => {
  user.authError = null
})

const submit = async () => {
  const error = submitForm(FormSchema)
  if (!error) {
    const data = await user.login(dataForm(FormSchema))
    if (data) router.push('/')
  }
}

</script>
