import axios from "axios";
import { tokenStorage } from "./tokenStorage.js";

const baseURL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080";

export const axiosInstance = axios.create({
  baseURL,
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
  },
});

/* Attach auhtorization header if token exists */
axiosInstance.interceptors.request.use(
  (config) => {
    const token = tokenStorage.get();

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    } else {
      delete config.headers.Authorization;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

/* always return res.data */
axiosInstance.interceptors.response.use(
  (response) => response.data,
  (error) => Promise.reject(error)
);

export default axiosInstance;
