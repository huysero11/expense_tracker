import axiosInstance from "../utils/axiosInstance";

const USER_API_URL = "/users";

const userApi = {
  getMe: async () => {
    const res = axiosInstance.get(`${USER_API_URL}/me`);

    return res;
  },
  updateMe: async ({ fullName }) => {
    const res = axiosInstance.patch(`${USER_API_URL}/me`, { fullName });

    return res;
  },
};

export default userApi;
