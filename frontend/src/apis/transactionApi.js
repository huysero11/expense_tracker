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
  update: async (id, payload) => {
    const res = await axiosInstance.put(
      `${TRANSACTION_API_URL}/${id}`,
      payload,
    );
    return res;
  },
  delete: async (id) => {
    const res = await axiosInstance.delete(`${TRANSACTION_API_URL}/${id}`);
    return res;
  },
};

export default transactionApi;
