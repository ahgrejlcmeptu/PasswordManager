<template>
  <app-popup
      title="Edit password"
      @close="$emit('cancel')"
  >
    <form @submit.prevent="submit">
      <AppInput
          :data="{
        placeholder: 'Name'
      }"
          v-model="name"
      />
      <div>
        <AppInput
            :data="{
        placeholder: 'Password'
      }"
            v-model="password"
        />
        <div class="link">generic password</div>
      </div>
      <AppInput
          :data="{
        placeholder: 'Sacred key'
      }"
          v-model="key"
      />
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
  name: "TheUpdate",
  emits: ['update', 'cancel'],
  props: ['data'],
  setup({data}, {emit}) {
    const name = ref(data.name)
    const password = ref(data.password)
    const key = ref('')

    const submit = () => {
      if (name.value.length < 2 && password.value.length < 3 && key.value.length < 3) return

      emit('update', {name: name.value, password: password.value, key: key.value})
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
