import axiosInstance from "../utils/axiosInstance";

const AUTH_API_URL = "/auth";

const authApi = {
  register: async (payload) => {
    /* payload = {fullName, email, password} */
    const res = axiosInstance.post(`${AUTH_API_URL}/register`, payload);

    return res;
  },

  login: async (payload) => {
    /* payload = {email, password} */
    const res = axiosInstance.post(`${AUTH_API_URL}/login`, payload);

    return res;
  },
};

export default authApi;
