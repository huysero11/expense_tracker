const TOKEN_KEY = "et_access_token";

export const tokenStorage = {
  get() {
    try {
      return localStorage.getItem(TOKEN_KEY);
    } catch (error) {
      console.error("Error getting token from localStorage:", error);
      return null;
    }
  },

  set(token) {
    try {
      localStorage.setItem(TOKEN_KEY, token);
    } catch (error) {
      console.error("Error setting token in localStorage:", error);
    }
  },

  clear() {
    try {
      localStorage.removeItem(TOKEN_KEY);
    } catch (error) {
      console.error("Error clearing token from localStorage:", error);
    }
  },
};
