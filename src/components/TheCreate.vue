<template>
  <app-popup
      title="Create password"
      @close="$emit('cancel')"
  >
    <form @submit.prevent="submit">

      <button class="btn">Create</button>
      <button class="btn btn-red" @click="$emit('cancel')">Back</button>
    </form>
  </app-popup>
</template>

<script>
import AppPopup from "./ui/AppPopup.vue";
import AppInput from "./ui/AppInput.vue";
import {ref} from "vue";

export default {
  name: "TheCreate",
  emits: ['create', 'cancel'],
  setup(_, {emit}) {
    const name = ref('')
    const password = ref('')
    const key = ref('')

    const submit = () => {
      if (name.value.length < 2 && password.value.length < 3 && key.value.length < 3) return
      emit('create', {name: name.value, password: password.value, key: key.value})
    }

    return {
      name, password, key, submit
    }
  },
  components: {
    AppPopup, AppInput
  }
}
</script>
