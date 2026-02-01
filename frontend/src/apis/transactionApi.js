import axiosInstance from "../utils/axiosInstance";

const TRANSACTION_API_URL = "/transactions";

const transactionApi = {
  create: async (payload) => {
    const res = await axiosInstance.post(TRANSACTION_API_URL, payload);
    return res;
  },
};

export default transactionApi;
