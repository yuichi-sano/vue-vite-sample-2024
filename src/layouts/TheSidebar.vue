<template>
  <div :class="['sidebar', { 'is-closed': isSidebarClosed }]">
    <div class="sidebar-sticky">
      <button class="toggle-button" @click="toggleSidebar">
        <i :class="isSidebarClosed ? 'bi-list' : 'bi-x-lg'"></i>
      </button>
      <ul class="nav flex-column">
        <li class="nav-item dropdown">
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { useNavigationStore } from "@/stores/navigationStore";
import { defineComponent, ref } from "vue";
import { useRouter } from "vue-router";

export default defineComponent({
  setup() {
    const router = useRouter();
    const isSidebarClosed = ref(false);
    const navigationStore = useNavigationStore();

    function toggleSidebar() {
      isSidebarClosed.value = !isSidebarClosed.value;
    }


    return {
      navigationStore,
      isSidebarClosed,
      toggleSidebar,
    };
  },
});
</script>

<style scoped>
.sidebar {
  background-color: #222222;
  color: white;
  padding: 10px;
  height: 100vh;
  overflow-y: auto;
  width: 260px;
  transition: width 0.3s;
}

.sidebar.is-closed {
  width: 100px;
}

.nav-link,
.dropdown-toggle {
  color: white !important;
  text-align: left;
  padding: 10px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.dropdown-menu {
  background-color: #555555;
  text-align: left;
}

.dropdown-item {
  color: white !important;
  text-align: left;
  padding: 8px 20px;
}

.dropdown-item:hover,
.dropdown-item:focus {
  color: #222222 !important;
  background-color: white;
}
</style>
