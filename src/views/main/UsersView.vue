<template>
  <the-card title="Пользователи">
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
    <div class="user-list" v-if="listUser.length">
      <table>
        <tr>
          <td>№</td>
          <td>Пользователь</td>
<!--          <td>Действие</td>-->
        </tr>
        <tr
            v-for="(keys, index) in listUser"
            :key="keys._id"
        >
          <td>{{ index + 1 }}</td>
          <td>
            <span class="key">{{ keys.login }}</span>
          </td>
<!--          <td>-->
<!--            <span @click="copyLink(keys.activationLink)" class="control">Копировать</span>-->
<!--          </td>-->
        </tr>
      </table>
    </div>
    <p v-else>Произошла ошибка</p>
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
import {useUser} from "../../stores/user";

const storeUser = useUser()
const router = useRouter()
const route = useRoute()
const loading = ref(false)
console.log(route)
const listUser = computed(() => storeUser.users)

onMounted(async () => {
  // await storeUser.load()
  await storeUser.load()
  loading.value = true
})

</script>

