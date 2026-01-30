import authReducer from "./slices/authSlice";
import categoriesReducer from "./slices/categoriesSlice";
import userReducer from "./slices/userSlice";
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    categories: categoriesReducer,
  },
});

export default store;
