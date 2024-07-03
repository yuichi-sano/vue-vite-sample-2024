import { setup } from "@storybook/vue3";
import "bootstrap/dist/css/bootstrap.css";
import { createRouter, createWebHistory } from "vue-router";

// Router
const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", name: "Login", component: { template: "<div>Login</div>" } },
    {
      path: "/password-reset",
      name: "PasswordReset",
      component: { template: "<div>Password Reset</div>" },
    },
    {
      path: "/dashboard",
      name: "DashBoard",
      component: { template: "<div>Dashboard</div>" },
    },
  ],
});

setup((app) => {
  app.use(router);
});

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};

export const decorators = [
  (Story: any) => ({
    components: { Story },
    template: "<story />",
  }),
];
