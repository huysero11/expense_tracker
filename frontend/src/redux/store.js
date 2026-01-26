import authReducer from "./slices/authSlice";
import categoriesReducer from "./slices/categoriesSlice";
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: {
    auth: authReducer,
    categories: categoriesReducer,
  },
});

export default store;
