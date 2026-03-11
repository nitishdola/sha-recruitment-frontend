import axios from "axios";

// const api = axios.create({
//   baseURL: "http://localhost:8000/api",
//   withCredentials: true,
// });

// export default api;

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

// Automatically attach token to every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auto logout on 401
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/";
    }
    return Promise.reject(error);
  },
);

export default api;
export const API_URL = import.meta.env.VITE_API_URL;
