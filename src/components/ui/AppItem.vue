<template>
  <div class="table-item">
    <div class="table-index">{{ data.index + 1 }}</div>
    <div class="table-name">{{ data.name }}</div>
    <div class="table-action">
      <router-link :to="'/password/' + data._id">
        <div class="table-btn btn" title="смотреть">
          <IconLook/>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
import IconLook from "../icons/IconLook.vue";

export default {
  name: "AppItem",
  emits: ['edit', 'remove'],
  props: ['data'],
  components: {IconLook}
}
</script>
