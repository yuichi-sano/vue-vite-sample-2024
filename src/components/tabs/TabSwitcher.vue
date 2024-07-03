<template>
  <ul class="nav nav-tabs">
    <li class="nav-item" v-for="tab in tabs" :key="tab.name">
      <a
        class="nav-link"
        :class="{ active: currentTab === tab.name }"
        @click.prevent="selectTab(tab.name)"
        href="#"
      >
        {{ tab.label }}
      </a>
    </li>
  </ul>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";

export default defineComponent({
  name: "TabSwitcher",
  props: {
    currentTab: {
      type: String as PropType<string>,
      required: true,
    },
    tabs: {
      type: Array as PropType<Array<{ name: string; label: string }>>,
      required: true,
    },
  },
  methods: {
    selectTab(tabName: string) {
      this.$emit("update:currentTab", tabName);
    },
  },
});
</script>
