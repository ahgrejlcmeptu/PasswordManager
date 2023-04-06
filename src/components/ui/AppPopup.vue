<template>
  <div class="popup">
    <div class="popup-backdrop" @click="$emit('close')"></div>
    <div class="popup-content card">
      <h2 class="popup-title">{{title}}</h2>
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "AppPopup",
  emits: ['close'],
  props: ['title']
}
</script>

