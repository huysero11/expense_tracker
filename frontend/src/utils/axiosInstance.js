// axiosInstance.js
import axios from "axios";
import { tokenStorage } from "./tokenStorage.js";
import authApi from "../apis/authApi.js";

const baseURL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080";

export const axiosInstance = axios.create({
  baseURL,
  timeout: 15000,
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = tokenStorage.get();
    if (token) config.headers.Authorization = `Bearer ${token}`;
    else delete config.headers.Authorization;
    return config;
  },
  (error) => Promise.reject(error),
);

let refreshPromise = null;

axiosInstance.interceptors.response.use(
  (response) => response.data,
  async (error) => {
    const status = error?.response?.status;
    const original = error?.config;
    if (!original) return Promise.reject(error);

    const url = original.url || "";

    // don't refresh on auth endpoints
    if (
      url.includes("/auth/refresh") ||
      url.includes("/auth/login") ||
      url.includes("/auth/logout")
    ) {
      return Promise.reject(error);
    }

    if (status !== 401) return Promise.reject(error);

    if (original._retry) return Promise.reject(error);
    original._retry = true;

    try {
      // if a refresh is already happening, wait for it
      if (!refreshPromise) {
        refreshPromise = authApi
          .refresh()
          .then((refreshRes) => {
            const newAccessToken = refreshRes?.data?.accessToken;
            if (!newAccessToken)
              throw new Error("No access token from refresh");
            tokenStorage.set(newAccessToken);
            return newAccessToken;
          })
          .finally(() => {
            refreshPromise = null;
          });
      }

      const newToken = await refreshPromise;

      original.headers = original.headers || {};
      original.headers.Authorization = `Bearer ${newToken}`;

      return axiosInstance(original);
    } catch (e) {
      tokenStorage.clear();
      window.location.href = "/login";
      return Promise.reject(e);
    }
  },
);

export default axiosInstance;
