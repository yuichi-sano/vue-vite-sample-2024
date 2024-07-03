<template>
  <div class="password-reset">
    <h2 class="text-center title">パスワード再設定</h2>

    <div class="container h-100">
      <div class="row h-100 justify-content-center align-items-center">
        <div class="col-12 col-md-8 col-lg-6 d-flex justify-content-center">
          <div class="card mb-3">
            <div class="card-body">
              <form @submit.prevent="validateForm">
                <div class="mb-3 row">
                  <label for="email" class="form-label">メールアドレス</label>
                  <input
                    type="email"
                    class="form-control"
                    id="email"
                    v-model="formData.email"
                    placeholder="メールアドレスを入力"
                  />
                  <div v-if="formErrors.email" class="text-danger">
                    {{ formErrors.email }}
                  </div>
                </div>

                <div class="mb-3 row">
                  <label for="newPassword" class="form-label"
                    >新しいパスワード</label
                  >
                  <input
                    type="password"
                    class="form-control"
                    id="newPassword"
                    v-model="formData.newPassword"
                    placeholder="半角英数字8～16文字以内"
                  />
                  <div v-if="formErrors.newPassword" class="text-danger">
                    {{ formErrors.newPassword }}
                  </div>
                </div>
                <div class="mb-3 row">
                  <label for="rePassword" class="form-label"
                    >パスワード(確認)</label
                  >
                  <input
                    type="password"
                    class="form-control"
                    id="rePassword"
                    v-model="formData.rePassword"
                    placeholder="パスワードを再入力してください"
                  />
                  <div v-if="formErrors.rePassword" class="text-danger">
                    {{ formErrors.rePassword }}
                  </div>
                </div>
                <div class="d-grid">
                  <button type="submit" class="btn btn-primary mb-2">
                    パスワード更新
                  </button>
                  <button @click="gotoLogin" class="btn btn-outline-secondary">
                    ログイン画面へ戻る
                  </button>
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
import {
  APIErrorMessages,
  ToastErrorMessages,
  ToastSuccessMessages,
} from "@/const/APIMessages";
import { defineComponent, ref } from "vue";
import { useRouter } from "vue-router";
import { useToast } from "vue-toastification";
import { z } from "zod";

export default defineComponent({
  name: "PasswordReset",
  setup() {
    const toast = useToast();
    const router = useRouter();

    const formData: any = ref({
      email: "",
      newPassword: "",
      rePassword: "",
    });
    const formErrors: any = ref({
      email: "",
      newPassword: "",
      rePassword: "",
    });

    const passwordReset: any = ref("");

    const passwordSchema = z
      .object({
        email: z.string().email("有効なメールアドレスを入力してください。"),
        newPassword: z
          .string()
          .min(8, "パスワードは8～16文字の半角英数字で入力してください。")
          .max(16, "パスワードは8～16文字の半角英数字で入力してください。")
          .regex(
            /^[a-zA-Z0-9]+$/,
            "パスワードは半角英数字で入力してください。"
          ),
        rePassword: z
          .string()
          .min(8, "パスワードは8～16文字の半角英数字で入力してください。")
          .max(16, "パスワードは8～16文字の半角英数字で入力してください。")
          .regex(
            /^[a-zA-Z0-9]+$/,
            "パスワードは半角英数字で入力してください。"
          ),
      })
      .refine((data) => data.newPassword === data.rePassword, {
        message: "パスワードが一致しません。",
        path: ["rePassword"],
      });

    const validateForm = () => {
      formErrors.value = {};
      const result: any = passwordSchema.safeParse(formData.value);
      if (!result.success) {
        result.error.issues.forEach((issue: any) => {
          formErrors.value[issue.path[0]] = issue.message;
        });
        return false;
      }
      if (confirm("本当に更新しますか？")) {
        submitForm();
      }
      return true;
    };

    const submitForm = async () => {
      try {
        // const response = await api.resetPassword(formData.value);
        toast.success(ToastSuccessMessages.PATCH);
        // console.log("パスワードリセット:", response.data);
      } catch (error) {
        toast.error(ToastErrorMessages.PATCH);
        console.error(APIErrorMessages.PATCH, error);
      }
    };

    const gotoLogin = () => {
      router.push({ name: "Login" });
    };

    return {
      passwordReset,
      formData,
      formErrors,
      validateForm,
      gotoLogin,
    };
  },
});
</script>

<style scoped>
.password-reset {
  background-color: #f8f9fa;
  min-height: 100vh;
  padding-top: 50px;
}

.container.h-100 {
  height: auto;
}

.card {
  max-width: 500px;
  margin: auto;
}
</style>
