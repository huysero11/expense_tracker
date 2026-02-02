import axiosInstance from "../utils/axiosInstance";

const TRANSACTION_API_URL = "/transactions";

const transactionApi = {
  create: async (payload) => {
    const res = await axiosInstance.post(TRANSACTION_API_URL, payload);
    return res;
  },
  get: async () => {
    const res = await axiosInstance.get(TRANSACTION_API_URL);
    return res;
  },
};

export default transactionApi;
