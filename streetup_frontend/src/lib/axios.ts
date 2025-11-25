import axios from "axios";

const baseURL =
  import.meta.env.MODE === "production"
    ? "https://marcos.alexis.ar/api"
    : "http://localhost:8000/api";

const api = axios.create({
  baseURL: baseURL,
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access_token");

    if (!config.url?.includes("/auth/login/") && token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
