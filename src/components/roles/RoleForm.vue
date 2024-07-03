<template>
  <form @submit.prevent="handleSubmit">
    <div class="mb-3 text-start">
      <label for="name" class="form-label text-start">役割名</label>
      <input
        type="text"
        v-model="role.name"
        class="form-control"
        id="name"
        placeholder="役割名を入力"
      />
      <div v-if="errors.name" class="text-danger">{{ errors.name }}</div>
    </div>
    <div class="mb-3 text-start">
      <label for="description" class="form-label text-start">説明</label>
      <input
        type="text"
        v-model="role.description"
        class="form-control"
        id="description"
        placeholder="説明を入力"
      />
      <div v-if="errors.description" class="text-danger">
        {{ errors.description }}
      </div>
    </div>
    <button type="submit" class="btn btn-primary">
      {{ submitButtonText }}
    </button>
  </form>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import Multiselect from "vue-multiselect";

export default defineComponent({
  components: { Multiselect },
  props: {
    role: {
      type: Object as PropType<{
        name: string;
        description: string;
      }>,
      required: true,
    },
    errors: {
      type: Object as PropType<Record<string, string>>,
      required: true,
    },
    handleSubmit: {
      type: Function as PropType<() => void>,
      required: true,
    },
    submitButtonText: {
      type: String,
      required: true,
    },
  },
});
</script>

<style scoped>
.text-danger {
  font-size: 0.875em;
}
</style>
