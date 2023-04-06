<template>
  <div class="container">
    <div ref="scene" id="scene">
      <div class="layer" data-depth-y="0.25" data-depth-x="-0.5"><img src="/img/moon.png" alt=""></div>
      <div class="layer" data-depth-x="0.15"><img src="/img/mountains02.png" alt=""></div>
      <div class="layer" data-depth-x="0.25"><img src="/img/mountains01.png" alt=""></div>
      <div class="layer" data-depth-x="-0.25"><img src="/img/road.png" alt=""></div>
    </div>
  </div>
</template>

<script>
import Parallax from 'parallax-js'
import {onMounted, ref} from "vue";

export default {
  name: "TheScene",
  setup() {
    const scene = ref()
    onMounted(() => {
      new Parallax(scene.value)
    })
    return {
      scene
    }
  }
}
</script>
