<template>
  <div>
    <div class="d-flex justify-content-between align-items-center mb-2">
      <div>
        全 {{ pagination.total }} 件中 {{ pagination.from }} -
        {{ pagination.to }} 件目
      </div>
      <div class="d-flex align-items-center">
        <Multiselect
          v-model="selectedPerPage"
          :options="perPageOptions"
          :allow-empty="false"
          deselect-label="選択解除不可"
          placeholder="表示件数"
          class="ml-2 multiselect-custom"
          @update:modelValue="onPerPageChange"
        />
      </div>
    </div>
    <div class="d-flex justify-content-end mt-2">
      <nav>
        <ul class="pagination mb-0">
          <li class="page-item" :class="{ disabled: isBeforeDisabled }">
            <button
              class="page-link"
              @click="prevPage"
              :disabled="isBeforeDisabled"
            >
              前へ
            </button>
          </li>
          <li
            class="page-item"
            :class="{ active: page === pagination.currentPage }"
            v-for="page in totalPages"
            :key="page"
          >
            <button class="page-link" @click="onPageChange(page)">
              {{ page }}
            </button>
          </li>
          <li class="page-item" :class="{ disabled: isNextDisabled }">
            <button
              class="page-link"
              @click="nextPage"
              :disabled="isNextDisabled"
            >
              次へ
            </button>
          </li>
        </ul>
      </nav>
    </div>
  </div>
</template>

<script lang="ts">
import { Pagination } from "@/types/Pagination";
import { PropType, computed, defineComponent, ref, watch } from "vue";
import Multiselect from "vue-multiselect";

export default defineComponent({
  components: { Multiselect },
  props: {
    pagination: {
      type: Object as PropType<Pagination>,
      required: true,
    },
    perPage: {
      type: Number,
      required: true,
    },
    perPageOptions: {
      type: Array as PropType<number[]>,
      required: true,
    },
    fetchData: {
      type: Function as PropType<(page: number, perPage: number) => void>,
      required: true,
    },
  },
  emits: ["update:perPage", "update:page"],
  setup(props, { emit }) {
    const selectedPerPage = ref(props.perPage);

    watch(selectedPerPage, (newVal) => {
      emit("update:perPage", newVal);
      props.fetchData(props.pagination.currentPage, newVal);
    });

    const totalPages = computed(() => {
      const pages = [];
      if (props.pagination.lastPage !== null) {
        for (let i = 1; i <= props.pagination.lastPage; i++) {
          pages.push(i);
        }
      }
      return pages;
    });

    const prevPage = () => {
      if (props.pagination.currentPage > 1) {
        emit("update:page", props.pagination.currentPage - 1);
        props.fetchData(
          props.pagination.currentPage - 1,
          selectedPerPage.value
        );
      }
    };

    const nextPage = () => {
      if (
        props.pagination.lastPage !== null &&
        props.pagination.currentPage < props.pagination.lastPage
      ) {
        emit("update:page", props.pagination.currentPage + 1);
        props.fetchData(
          props.pagination.currentPage + 1,
          selectedPerPage.value
        );
      }
    };

    const onPageChange = (page: number) => {
      emit("update:page", page);
      props.fetchData(page, selectedPerPage.value);
    };

    const onPerPageChange = (value: number) => {
      selectedPerPage.value = value;
    };

    const isBeforeDisabled = computed(() => {
      return props.pagination.currentPage <= 1;
    });

    const isNextDisabled = computed(() => {
      return (
        props.pagination.lastPage === null ||
        props.pagination.currentPage >= props.pagination.lastPage
      );
    });

    return {
      selectedPerPage,
      totalPages,
      prevPage,
      nextPage,
      onPageChange,
      onPerPageChange,
      isBeforeDisabled,
      isNextDisabled,
    };
  },
});
</script>

<style scoped>
.multiselect-custom {
  min-width: 80px;
  max-width: 100px;
}

.d-flex.align-items-center .multiselect-custom {
  margin-left: 8px;
}
</style>
