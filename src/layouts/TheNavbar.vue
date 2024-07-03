<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light fixed-top">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">TM</a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item">
            <!-- TODO: ナビゲーションのアイテム追加 -->
            <!-- <a class="nav-link active" aria-current="page" href="#">Home</a> -->
          </li>
          <li class="nav-item select-form-nav-item">
            <multiselect
              id="projectSelect"
              placeholder="プロジェクトを選択"
              v-model="navigationStore.selectedProject"
              :options="projects"
              :searchable="true"
              :close-on-select="true"
              track-by="id"
              label="name"
              @select="onProjectSelect"
            />
          </li>
          <li class="nav-item select-form-nav-item">
            <multiselect
              id="companySelect"
              placeholder="企業を選択"
              v-model="navigationStore.selectedCompany"
              :options="companies"
              :searchable="true"
              :close-on-select="true"
              track-by="id"
              label="name"
              @select="onCompanySelect"
            />
          </li>
        </ul>
      </div>

      <div class="d-flex align-items-center">
        <i
          class="bi bi-calendar me-2"
          style="font-size: 1.5rem; cursor: pointer"
          @click="gotoProjectEvent"
        ></i>
        <div class="dropdown">
          <span
            class="navbar-text dropdown-toggle"
            id="administratorDropdown"
            data-bs-toggle="dropdown"
            aria-expanded="false"
            style="cursor: pointer"
          >
            Administrator
          </span>
          <ul
            class="dropdown-menu dropdown-menu-end"
            aria-labelledby="administratorDropdown"
          >
            <li>
              <a
                class="dropdown-item"
                href="#"
                @click.prevent="gotoPasswordReset"
                >パスワード再設定</a
              >
            </li>
            <li>
              <a class="dropdown-item" href="#" @click.prevent="logout"
                >ログアウト</a
              >
            </li>
            <!-- TODO: 他のメニュー項目を追加 -->
          </ul>
        </div>
      </div>
    </div>
  </nav>
</template>

<script lang="ts">
// import api from "@/api/API";
import {
  CompanyType,
  ProjectType,
  companies,
  projects,
} from "@/types/DummyData";
import { defineComponent } from "vue";
import Multiselect from "vue-multiselect";
import { useRouter } from "vue-router";
import { useNavigationStore } from "../stores/navigationStore";

export default defineComponent({
  components: {
    Multiselect,
  },
  setup() {
    const navigationStore = useNavigationStore();
    const router = useRouter();

    const gotoPasswordReset = () => {
      router.push({ name: "PasswordReset" });
    };

    const gotoProjectEvent = () => {
      router.push({ name: "ProjectEvent" });
    };

    const onProjectSelect = (project: ProjectType) => {
      navigationStore.setProject(project);
    };

    const onCompanySelect = (company: CompanyType) => {
      navigationStore.setCompany(company);
    };

    const logout = async () => {
      try {
        // await api.logout(1);
        router.push({ name: "Login" });
      } catch (error) {
        console.error("Logout failed", error);
      }
    };

    return {
      projects,
      companies,
      navigationStore,
      gotoPasswordReset,
      gotoProjectEvent,
      onProjectSelect,
      onCompanySelect,
      logout,
    };
  },
});
</script>

<style scoped>
.select-form-nav-item {
  margin-left: 20px;
}
.navbar-nav {
  align-items: center;
}
.dropdown-menu-end {
  right: 0;
  left: auto;
}
</style>
