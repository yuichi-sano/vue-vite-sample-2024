<template>
  <div>
    <div class="d-flex justify-content-between mb-3">
      <button type="button" class="btn btn-outline-primary" @click="selectAll">
        全チェック
      </button>
      <button
        type="button"
        class="btn btn-outline-secondary"
        @click="deselectAll"
      >
        全チェック解除
      </button>
    </div>
    <div
      v-for="(column, index) in availableColumns"
      :key="index"
      class="form-check d-flex align-items-center"
    >
      <input
        class="form-check-input"
        type="checkbox"
        :value="column"
        v-model="selectedColumns"
      />
      <label class="form-check-label ms-2">{{ column }}</label>
    </div>
    <button type="button" class="btn btn-primary mt-3" @click="applySelection">
      適用
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";

export default defineComponent({
  props: {
    availableColumns: {
      type: Array as PropType<string[]>,
      required: true,
    },
    selectedColumns: {
      type: Array as PropType<string[]>,
      required: true,
    },
    applySelection: {
      type: Function as PropType<() => void>,
      required: true,
    },
    selectAll: {
      type: Function as PropType<() => void>,
      required: true,
    },
    deselectAll: {
      type: Function as PropType<() => void>,
      required: true,
    },
  },
});
</script>
