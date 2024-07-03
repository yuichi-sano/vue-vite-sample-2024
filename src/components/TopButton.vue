<template>
  <button @click="scrollToTop" class="btn btn-outline-secondary btn-top">
    TOP
  </button>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  methods: {
    scrollToTop() {
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
  },
});
</script>

<style scoped>
.btn-top {
  position: fixed;
  right: 10px;
  bottom: 10px;
}
</style>
