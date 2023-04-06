<template>
  <the-card title="Список паролей">
    <router-link to="/create">
      <app-btn>Создать</app-btn>
    </router-link>
    <div class="table" v-if="Object.values(passwordList).length">
      <AppItem
          v-for="(item, index) in Object.values(passwordList)"
          :key="item._id"
          :data="{...item, index}"
      />
    </div>
    <p v-else>Создайте свой первый пароль</p>
    <div class="group">
      <div v-if="user.isAdmin">
        <router-link to="/keys">Список ключей</router-link>
        <br>
        <router-link to="/users">Список пользователей</router-link>
      </div>
      <a @click.prevent="logout">Выйти</a>
    </div>
  </the-card>
</template>

<script setup>
import TheCard from "../../components/TheCard.vue";
import AppBtn from "../../components/ui/AppBtn.vue";
import AppItem from "../../components/ui/AppItem.vue";
import {computed} from "vue";
import {useUser} from "../../stores/user";
import {usePassword} from "../../stores/password";
import {useRouter} from "vue-router";

const router = useRouter()
const user = useUser()
const storePassword = usePassword()

const passwordList = computed(() => storePassword.passwords)

const logout = async () => {
  await user.logout()
  router.push('/auth')
}

</script>

