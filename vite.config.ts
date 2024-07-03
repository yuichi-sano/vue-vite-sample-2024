import vue from "@vitejs/plugin-vue";
import { fileURLToPath } from "url";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue({})],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  server: {
    proxy: {
      "/api-local": {
        target: "http://localhost:8000/api/",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api-local/, ""),
      },
      "/api-stg": {
        target: "https://staging-api-base-url.com/api/v1/",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api-stg/, ""),
      },
      "/api-prd": {
        target: "https://production-api-base-url.com/api/v1/",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api-prd/, ""),
      },
    },
  },
});
