<template>
  <the-card title="Пользователи">
    <div class="user-list" v-if="listUser.length">
      <table>
        <tr>
          <td>№</td>
          <td>Пользователь</td>
          <td>Статус</td>
          <td>Действие</td>
        </tr>
        <tr
            v-for="(keys, index) in listUser"
            :key="keys._id"
        >
          <td>{{ index + 1 }}</td>
          <td>
            <span class="key">{{ keys.login }}</span>
          </td>
          <td>
            <span class="key">{{ keys.status }}</span>
          </td>
          <td>
            <span>{{keys.status === 'active' ? 'Блокировать' : 'Разблокировать'}}</span>
          </td>
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
import {computed, onMounted, ref} from "vue";
import {useUser} from "../../stores/user";

const storeUser = useUser()
const loading = ref(false)

const listUser = computed(() => storeUser.users)

onMounted(async () => {
  await storeUser.load()
  loading.value = true
})

</script>

