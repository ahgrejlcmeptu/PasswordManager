<template>
  <the-card title="Изменить пароль">
    <form @submit.prevent="submit" v-if="loading">
      <AppInput
          :data="FormSchema.name"
          v-model="FormSchema.name.value"
      />
      <AppInput
          :data="FormSchema.url"
          v-model="FormSchema.url.value"
      />
      <div>
        <AppInput
            :data="FormSchema.password"
            v-model="FormSchema.password.value"
        />
        <div @click="generic" class="link">Сгенерировать</div>
      </div>
      <AppInput
          :data="sacredKey"
          v-model="sacredKey.value"
      />
      <app-btn type="submit">Сохранить</app-btn>
      <router-link :to="'/password/' + id">
        <app-btn color="btn-red">Назад</app-btn>
      </router-link>
    </form>
  </the-card>
</template>

<script setup>
import TheCard from "../../components/TheCard.vue";
import AppBtn from "../../components/ui/AppBtn.vue";
import AppInput from "../../components/ui/AppInput.vue";
import {onMounted, reactive, ref} from "vue";
import {usePassword} from "../../stores/password";
import {useRoute, useRouter} from "vue-router";
import {dataForm, submitForm} from "../../utils/form";
import {decodeWord, genericPassword} from "../../utils/encode";

const router = useRouter()
const route = useRoute()
const storePassword = usePassword()
const id = ref(route.params.id)
const loading = ref(false)

onMounted(() => {
  if (!storePassword.passwords[id.value]) {
    return router.push('/')
  }

  for (let key in FormSchema) {
    FormSchema[key].value = storePassword.passwords[id.value][key]
  }
  loading.value = true
})

const FormSchema = reactive({
  name: {
    name: 'name',
    value: '',
    placeholder: 'Название',
    textError: '',
    listError: ['Введите название', 'Название не меньше 3 символов'],
    error: false,
    required: true,
    min: 3,
  },
  url: {
    name: 'url',
    value: '',
    placeholder: 'Адрес сайта'
  },
  password: {
    name: 'password',
    value: '',
    placeholder: 'Пароль',
    textError: '',
    listError: ['Введите пароль', 'Пароль не меньше 6 символов'],
    error: false,
    required: true,
    min: 6,
  },
})

const sacredKey = reactive({
  name: 'key',
  value: '',
  placeholder: 'Секретный ключ',
  textError: '',
  listError: ['Введите ключ', 'Ключ не меньше 3 символов'],
  error: false,
  required: true,
  min: 3,
})

const generic = () => {
  FormSchema.password.value = genericPassword().slice(0, 16)
}

const submit = async () => {
  const error = submitForm(FormSchema)
  const errorKey = submitForm({sacredKey})

  if (!error && !errorKey) {
    const data = await storePassword.update({
      ...dataForm(FormSchema),
      _id: id.value,
      password: decodeWord(FormSchema.password.value, sacredKey.value)
    })
    if (data) router.push('/password/' + id.value)
  }
}

</script>

