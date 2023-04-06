<script>
import TheScene from "./components/TheScene.vue";
import MainLayout from "./layouts/MainLayout.vue";
import OtherLayout from "./layouts/OtherLayout.vue";
import {useRoute} from "vue-router";
import {computed} from "vue";

export default {
  components: {TheScene, MainLayout, OtherLayout},
  setup() {
    const route = useRoute()

    return {
      layout: computed(() => route.meta.layout)
    }
  }
}
</script>

<template>
  <TheScene/>
  <component v-if="layout" :is="layout + '-layout'"></component>
</template>
