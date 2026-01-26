import axios from "axios";
import { tokenStorage } from "./tokenStorage.js";
import authApi from "../apis/authApi.js";

const baseURL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080";

export const axiosInstance = axios.create({
  baseURL,
  timeout: 15000,
  withCredentials: true,
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
  (error) => Promise.reject(error),
);

axiosInstance.interceptors.response.use(
  (response) => response.data,
  async (error) => {
    const status = error?.response?.status;
    const original = error?.config;

    if (!original) return Promise.reject(error);

    const url = original.url || "";

    // no try to refresh when the failing request is auth itself
    if (
      url.includes("/auth/refresh") ||
      url.includes("/auth/login") ||
      url.includes("/auth/logout")
    ) {
      return Promise.reject(error);
    }

    if (status === 401 && !original._retry) {
      original._retry = true;

      try {
        const refreshRes = await authApi.refresh();
        const newAccessToken = refreshRes?.data?.accessToken;

        if (!newAccessToken) throw new Error("No access token from refresh");

        tokenStorage.set(newAccessToken);

        original.headers = original.headers || {};
        original.headers.Authorization = `Bearer ${newAccessToken}`;

        return axiosInstance(original);
      } catch (e) {
        /*In case refresh token is expired, user have to log in again */
        tokenStorage.clear();
        window.location.href = "/login";
        return Promise.reject(e);
      }
    }

    return Promise.reject(error);
  },
);

export default axiosInstance;
