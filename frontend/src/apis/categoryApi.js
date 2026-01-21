import axiosInstance from "../utils/axiosInstance";

const CATEGORY_API_URL = "/categories";

const categoryApi = {
  getAll: async (params = {}) => {
    const query = {};
    if (params?.type) {
      query.type = params.type;
    }

    const res = axiosInstance.get(CATEGORY_API_URL, { params: query });
    return res;
  },

  /**
   * payload: {name: string, type: "expense | income"}
   */
  create: async (payload) => {
    const res = axiosInstance.post(CATEGORY_API_URL, payload);
    return res;
  },

  /**
   * payload: {name, type}
   */
  update: async (id, payload) => {
    const res = axiosInstance.put(`${CATEGORY_API_URL}/${id}`, payload);
    return res;
  },

  delete: async (id) => {
    const res = axiosInstance.delete(`${CATEGORY_API_URL}/${id}`);
    return res;
  },
};

export default categoryApi;
