import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { createPinia } from "pinia";
import VCalendar from "v-calendar";
import "v-calendar/style.css";
import { createApp } from "vue";
import Multiselect from "vue-multiselect";
import "vue-multiselect/dist/vue-multiselect.css";
import Tippy from "vue-tippy";
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";
import App from "./App.vue";
import router from "./router";

// Vueアプリケーション作成
const app = createApp(App);

// vue-multi-select
app.component("multi-select", Multiselect);

// router
app.use(router);

// pinia
app.use(createPinia());

// v-calendar
app.use(VCalendar, {});

// toast
app.use(Toast, {});

// vue-tippy
app.use(Tippy, {
  directive: "tippy",
  flipDuration: 0,
  popperOptions: {
    modifiers: {
      preventOverflow: {
        enabled: true,
      },
    },
  },
});

// アプリケーションマウント
app.mount("#app");
