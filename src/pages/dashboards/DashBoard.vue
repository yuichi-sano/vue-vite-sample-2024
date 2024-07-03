<template>
  <div class="container-fluid p-0">
    <!-- ナビゲーション -->
    <TheNavbar />
    <div class="row min-vh-100 flex-nowrap">
      <!-- サイドバー -->
      <TheSidebar />
      <div class="col-md-9 col-xl-10">
        <!-- メインコンテンツ -->
        <div class="container mt-4">
          <div class="d-flex justify-content-between align-items-center mb-3">
            <h1>ダッシュボード</h1>
          </div>
        </div>
      </div>
    </div>
    <!-- ローダー -->
    <div
      v-if="loading"
      class="loader-overlay d-flex justify-content-center align-items-center"
    >
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
    <!-- TOP -->
    <button @click="scrollToTop" class="btn btn-outline-secondary btn-top">
      TOP
    </button>
  </div>
</template>

<script lang="ts">
import TheNavbar from "@/layouts/TheNavbar.vue";
import TheSidebar from "@/layouts/TheSidebar.vue";
import { computed, defineComponent, ref } from "vue";
// import { useRouter } from "vue-router";
// import { useToast } from "vue-toastification";

export default defineComponent({
  components: {
    TheNavbar,
    TheSidebar,
    FullCalendar,
  },
  setup() {
    const loading = ref(false);
    // const router = useRouter();
    // const toast = useToast();
    const startDate = ref("");
    const endDate = ref("");


    return {
      loading,
      startDate,
      endDate,
    };
  },
});
</script>

<style>
.card {
  max-width: 100%;
  margin: 0 auto;
}

.fc {
  max-width: 100%;
  margin: 0 auto;
}
</style>
