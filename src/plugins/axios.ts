import axios from "axios";
import Cookies from "js-cookie"; // Import js-cookie library instead of universal-cookies

const token =
  sessionStorage.getItem("admin_token") || Cookies.get("admin_token") || "";

// axios.defaults.headers.common.Authorization = `Bearer ${token}`;

// export const backendUrl = `${import.meta.env.VITE_BACKEND_PROTOCOL}://${
//   import.meta.env.VITE_BACKEND_HOSTNAME
// }:${import.meta.env.VITE_BACKEND_PORT}/api`;

export const backendUrl = `${import.meta.env.VITE_BACKEND_PORT}/api/admin`;

const api = axios.create({
  // baseURL: import.meta.env.VITE_API_URL?.toString(),
  baseURL: `${backendUrl}/v1`,
  // headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
  headers: { Authorization: `Bearer ${token}` },
});

api.interceptors.request.use(
  (config) => {
    const token = Cookies.get("token") || sessionStorage.getItem("token");

    if (token && config.headers !== undefined) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
export default api;
