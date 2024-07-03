import Login from "@/pages/auths/Login.vue";
import PasswordReset from "@/pages/auths/PasswordReset.vue";
import DashBoard from "@/pages/dashboards/DashBoard.vue";
import { createRouter, createWebHistory } from "vue-router";

// ルート定義
const routes = [
  {
    path: "/",
    name: "Login",
    component: Login,
  },

  {
    path: "/password-reset",
    name: "PasswordReset",
    component: PasswordReset,
  },

  {
    path: "/dashboard",
    name: "DashBoard",
    component: DashBoard,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
