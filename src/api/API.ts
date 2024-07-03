import axios from "axios";

// TODO: axiosインスタンス作成（ベースURLなどの共通設定）
const api = axios.create({
  // TODO: ローカル環境
  baseURL: "/api-local",
});

// 検証用ダミーAPI
const users = async () => {
  const response = await api.get(`/users`);
  return response.data;
};

// ログイン
const login = async (formData: any) => {
  const response = await api.post(`/login`, formData);
  return response.data;
};

// ログアウト
const logout = async (formData: any) => {
  const response = await api.post(`/user/logout`, formData);
  return response.data;
};


export default {
  users,
  login,
  logout,
};
