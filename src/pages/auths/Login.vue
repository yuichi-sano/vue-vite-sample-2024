<template>
  <div class="background">
    <h2 class="text-center title">Trap Mailer</h2>
    <div class="container h-100">
      <div class="row h-100 justify-content-center align-items-center">
        <div class="col-12 d-flex justify-content-center">
          <div class="card">
            <div class="card-body">
              <form @submit.prevent="login">
                <div class="mb-3">
                  <label for="email" class="form-label">ログイン</label>
                  <input
                    type="text"
                    class="form-control"
                    id="email"
                    v-model="formData.email"
                    placeholder="メールアドレス"
                  />
                  <div v-if="formErrors.email" class="text-danger">
                    {{ formErrors.email }}
                  </div>
                </div>
                <div class="mb-3">
                  <input
                    type="password"
                    class="form-control"
                    id="password"
                    v-model="formData.password"
                    placeholder="パスワード"
                  />
                  <div v-if="formErrors.password" class="text-danger">
                    {{ formErrors.password }}
                  </div>
                </div>
                <div class="d-grid">
                  <button
                    type="submit"
                    class="btn btn-primary mb-2"
                    :disabled="loading"
                  >
                    <span
                      v-if="loading"
                      class="spinner-border spinner-border-sm"
                      role="status"
                      aria-hidden="true"
                    ></span>
                    ログイン
                  </button>
                  <div @click="gotoPasswordReset" class="password-link">
                    パスワードを忘れた方はこちら
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
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import api from "@/api/API"; // 先程作成したaxiosインスタンスをインポート
import { defineComponent, ref } from "vue";
import { useRouter } from "vue-router";
import { z } from "zod";

const loginSchema = z.object({
  email: z.string().email("有効なメールアドレスを入力してください。"),
  password: z.string().min(1, "パスワードを入力してください。"),
});

export default defineComponent({
  name: "LoginPage",
  setup() {
    const formData = ref({
      email: "",
      password: "",
    });
    const formErrors = ref<{ email?: string; password?: string }>({});
    const loading = ref(false);
    const router = useRouter();

    const validate = () => {
      const result = loginSchema.safeParse(formData.value);
      if (!result.success) {
        const formattedErrors: Record<string, string> = {};
        result.error.errors.forEach((error) => {
          formattedErrors[error.path[0]] = error.message;
        });
        formErrors.value = formattedErrors;
        return false;
      }
      formErrors.value = {};
      return true;
    };

    // const setCookie = (name: string, value: string, days: number) => {
    //   const expires = new Date(Date.now() + days * 864e5).toUTCString();
    //   document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/`;
    // };

    const login = async () => {
      if (!validate()) {
        return;
      }

      loading.value = true;

      try {
        // TODO: 正規のAPI(Cognito認証でトークンを取得する)
        // const response = await api.login({
        //   email: formData.value.email,
        //   password: formData.value.password,
        // });
        const response = await api.users();
        console.log("Login successful:", response);
        // トークンをCookieに保存
        // setCookie("token", response.access_token, 7); // 7日間有効
        router.push({ name: "DashBoard" });
      } catch (error: any) {
        if (error.response && error.response.data) {
          formErrors.value = error.response.data.errors || {};
        } else {
          console.error("Login error:", error);
        }
      } finally {
        loading.value = false;
      }
    };

    const gotoPasswordReset = () => {
      router.push({ name: "PasswordReset" });
    };

    return {
      formData,
      formErrors,
      loading,
      login,
      gotoPasswordReset,
    };
  },
});
</script>

<style scoped>
.background {
  background-color: #f8f9fa;
  min-height: 100vh;
  padding-top: 50px;
}

.title {
  margin-bottom: 50px;
}

.container.h-100 {
  height: auto;
}

.card {
  max-width: 400px;
  margin: auto;
}

.text-danger {
  color: #dc3545;
}

.password-link {
  color: #007bff;
  cursor: pointer;
  text-decoration: underline;
}

.password-link:hover {
  color: #0056b3;
}
</style>
