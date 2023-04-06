<template>
  <div
      :class="['input-item', {'error': data.error}]"
  >
    <div class="inputBox">
      <div
          :class="['label', {'focus': focus || data.value}]"
      >{{data.placeholder}}</div>
      <input
          :type="data.type || 'text'"
          v-model.trim="data.value"
          :name="data.name"
          @focus="focus = true"
          @blur="focus = false"
          @keypress.enter="$emit('enter')"
      >

    </div>
    <div
        v-if="data.error && data.textError"
        class="inputBox-error"
    >{{data.textError}}</div>
  </div>
</template>

<script>
import {ref, watch} from "vue";

export default {
  name: "AppInput",
  props: ['data'],
  setup() {
    const focus = ref(false)

    return {
      focus
    }
  }
}
</script>
