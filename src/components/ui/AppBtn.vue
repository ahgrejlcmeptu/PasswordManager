<template>
  <component
      :is="type ? 'button' : 'div'"
      :type="type"
      :class="['btn', color]"
      @click="$emit('action')"
      :title="title"
  >
    <slot></slot>
  </component>
</template>

<script>
export default {
  name: "AppBtn",
  emits: ['action'],
  props: ['type', 'color', 'title']
}
</script>
