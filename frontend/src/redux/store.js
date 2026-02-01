import authReducer from "./slices/authSlice";
import categoriesReducer from "./slices/categoriesSlice";
import userReducer from "./slices/userSlice";
import transactionsReducer from "./slices/transactionsSlice";
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    categories: categoriesReducer,
    transactions: transactionsReducer,
  },
});

export default store;
