<template>
  <app-popup
      @close="$emit('reject')"
      :title="title"
  >
    <div class="confirm-buttons">
      <div class="btn btn-red" @click="$emit('accept')">Да</div>
      <div class="btn" @click="$emit('reject')">Нет</div>
    </div>
  </app-popup>
</template>

<script>
import AppPopup from "./AppPopup.vue";
export default {
  name: "AppConfirm",
  emits: ['accept', 'reject'],
  props: ['title'],
  components: {
    AppPopup
  }
}
</script>
