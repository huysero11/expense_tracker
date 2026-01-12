import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authApi from "../../apis/authApi";

export const registerThunk = createAsyncThunk(
  "auth/register",
  async ({ email, password, fullName }, { rejectWithValue }) => {
    try {
      // If your axiosInstance already returns res.data, "res" is the data.
      const res = await authApi.register({ email, password, fullName });

      return res;
    } catch (err) {
      const message =
        err?.response?.data?.message ||
        err?.response?.data?.error ||
        err?.message ||
        "Register failed.";
      return rejectWithValue(message);
    }
  }
);

const initialState = {
  user: null,
  status: "idle", // idle | loading | succeeded | failed
  error: null,

  // For global antd message
  notice: null, // { type: "success"|"error"|"info"|"warning", content: string, id: number }
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
      state.status = "idle";
      state.error = null;
      state.notice = null;
    },
    clearAuthError(state) {
      state.error = null;
    },
    clearNotice(state) {
      state.notice = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerThunk.pending, (state) => {
        state.status = "loading";
        state.error = null;
        // do not clear notice here unless you want to cancel showing older notice
      })
      .addCase(registerThunk.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.error = null;

        // Your backend returns: { status: "success", message: "User registered successfully" }
        const content =
          action.payload?.message || "User registered successfully";

        state.notice = {
          type: "success",
          content,
          id: Date.now(), // unique id to trigger useEffect
        };

        // console.log("In authSlice, Register success:", action.payload);
      })
      .addCase(registerThunk.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Register failed.";

        state.notice = {
          type: "error",
          content: state.error,
          id: Date.now(),
        };
      });
  },
});

export const { logout, clearAuthError, clearNotice } = authSlice.actions;
export default authSlice.reducer;
