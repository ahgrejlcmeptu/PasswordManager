<template>
  <RouterView v-if="loading"/>
</template>

<script setup>
import {usePassword} from "../stores/password";
import {onMounted, ref} from "vue";

const loading = ref(false)

onMounted(async () => {
  await usePassword().load()
  loading.value = true
})
</script>

