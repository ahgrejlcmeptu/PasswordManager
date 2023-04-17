<template>
  <the-card title="Ваш пароль" v-show="!confirm">
    <div class="f">
      <p>Название</p>
      <p>{{ data.name }}</p>
    </div>
    <div class="f">
      <p>Адрес сайта</p>
      <p>{{ data.url }}</p>
    </div>
    <div class="f">
      <p>Пароль</p>
      <p>{{ data.password }}</p>
    </div>
    <div class="f f-w">
      <AppInput
          :data="key"
          @enter="togglePassword"
      />
      <div @click="togglePassword" class="checked">{{visible ? 'Скрыть' : 'Показать'}} пароль</div>
      <div v-if="visible" @click="copyPassword" class="checked">Копировать</div>
    </div>
    <div class="f">
      <router-link :to="'/edit/'+ id">
        <app-btn title="Редактировать">
          <IconEdit/>
        </app-btn>
      </router-link>
      <app-btn @action="remove" title="Удалить">
        <IconRemove/>
      </app-btn>
    </div>
    <router-link to="/">
      <app-btn color="btn-red">Назад</app-btn>
    </router-link>
  </the-card>
  <teleport to="body">
    <AppConfirm
        v-if="confirm"
        @accept="accept"
        @reject="confirm = null"
        title="Удалить пароль"
    />
  </teleport>
</template>

<script setup>
import AppConfirm from "../../components/ui/AppConfirm.vue";
import IconEdit from "../../components/icons/IconEdit.vue";
import IconRemove from "../../components/icons/IconRemove.vue";
import TheCard from "../../components/TheCard.vue";
import AppBtn from "../../components/ui/AppBtn.vue";
import AppInput from "../../components/ui/AppInput.vue";
import {onMounted, reactive, ref, watch} from "vue";
import {usePassword} from "../../stores/password";
import {useRoute, useRouter} from "vue-router";
import {decodeWord} from "../../utils/encode";
import {copy} from "../../utils/copy";

const router = useRouter()
const route = useRoute()
const storePassword = usePassword()
const id = ref(route.params.id)
const data = reactive({...storePassword.passwords[id.value]})
const key = reactive({
  placeholder: 'Секретный ключ',
  value: ''
})
const activeKey = ref(null)
const visible = ref(false)
const confirm = ref(null)

onMounted(() => {
  if (!storePassword.passwords[id.value]) router.push('/')
})

watch([key], () => {
  if (visible.value) {
    visible.value = false
    data.password = decodeWord(data.password, activeKey.value)
  }
})

const togglePassword = () => {
  if (key.value.length < 3) return
  visible.value = !visible.value
  data.password = decodeWord(data.password, key.value, visible.value)
  activeKey.value = key.value
}

const remove = () => confirm.value = id.value

const accept = async () => {
  await storePassword.remove(id.value)
  confirm.value = null
  router.push('/')
}

const copyPassword = () => copy(data.password)
</script>

