<template>
  <div class="card-wrapper">
    <div class="card">
      <h2 v-if="title">{{ title }}</h2>
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "TheCard",
  props: ['title']
}
</script>
