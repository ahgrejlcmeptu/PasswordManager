<template>
  <div class="card-wrapper">
    <form class="card" @submit.prevent="$emit('submit')">
      <h2>{{ title }}</h2>
      <slot></slot>


      <slot name="footer"></slot>
    </form>
  </div>
</template>

<script>
export default {
  name: "TheAuth",
  emits: ['submit'],
  props: ['title', 'textSubmit']
}
</script>
