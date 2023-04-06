<template>
  <the-card title="Ключи">
<!--    <div class="user-list" v-if="listUser.length">-->
<!--      <div class="app-user border">-->
<!--        <div class="app-user-idx">№</div>-->
<!--        <div class="app-user-name">Никнейм</div>-->
<!--      </div>-->
<!--      <AppUser-->
<!--        v-for="(user, index) in listUser"-->
<!--        :key="user._id"-->
<!--        :data="{...user, index}"-->
<!--      />-->
<!--    </div>-->
    <div class="user-list" v-if="listKeys.length">
      <table>
        <tr>
          <td>№</td>
          <td>Ключи</td>
          <td>Действие</td>
        </tr>
        <tr
            v-for="(keys, index) in listKeys"
            :key="keys._id"
        >
          <td>{{ index + 1 }}</td>
          <td>
            <span class="key">{{ keys.activationLink }}</span>
          </td>
          <td>
            <span @click="copyLink(keys.activationLink)" class="control">Копировать</span>
          </td>
        </tr>
      </table>
    </div>
    <p v-else>Регистрационных ключе нет</p>
    <app-btn @action="create">Создать ключ</app-btn>
    <router-link to="/">
      <app-btn color="btn-red">Назад</app-btn>
    </router-link>
  </the-card>
</template>

<script setup>
import TheCard from "../../components/TheCard.vue";
import AppBtn from "../../components/ui/AppBtn.vue";
import {useRouter, useRoute} from "vue-router";
import {computed, onMounted, ref} from "vue";
// import {useUser} from "../../stores/user";
import {useRegistration} from "../../stores/registration";
import {copy} from "../../utils/copy";

// const storeUser = useUser()
const storeRegistration = useRegistration()
const router = useRouter()
const route = useRoute()
const loading = ref(false)
console.log(route)
// const listUser = computed(() => storeUser.users)
const listKeys = computed(() => storeRegistration.keys)

onMounted(async () => {
  // await storeUser.load()
  await storeRegistration.load()
  loading.value = true
})

const create = async () => {
  await storeRegistration.create()
}

const copyLink = (text) => {
  console.log(location.host)
  copy(location.host + '/signup/' + text)
}

</script>

