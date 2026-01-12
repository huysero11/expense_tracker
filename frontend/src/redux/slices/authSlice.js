import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authApi from "../../apis/authApi";
import { tokenStorage } from "../../utils/tokenStorage.js";

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

export const loginThunk = createAsyncThunk(
  "auth/login",
  async ({ email, password }, { rejectWithValue }) => {
    // console.log("In loginThunk with:", { email, password });
    try {
      const res = await authApi.login({ email, password });
      return res;
    } catch (err) {
      const message =
        err?.response?.data?.message ||
        err?.response?.data?.error ||
        err?.message ||
        "Login failed.";
      return rejectWithValue(message);
    }
  }
);

const initialState = {
  user: null,
  status: "idle", // idle | loading | succeeded | failed
  error: null,
  token: tokenStorage.get(),

  // For global antd message
  notice: null, // { type: "success"|"error"|"info"|"warning", content: string, id: number }
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
      state.token = null;
      state.status = "idle";
      state.error = null;
      state.notice = null;

      tokenStorage.clear();
    },
    clearAuthError(state) {
      state.error = null;
    },
    clearNotice(state) {
      state.notice = null;
    },
  },
  extraReducers: (builder) => {
    /* Register */
    builder
      .addCase(registerThunk.pending, (state) => {
        state.status = "loading";
        state.error = null;
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

    /* Login */
    builder
      .addCase(loginThunk.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(loginThunk.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.error = null;
        state.user = action.payload.data.user;
        state.token = action.payload.data.accessToken;

        // console.log("In authSlice, Login success:", action.payload);

        if (state.token) {
          tokenStorage.set(state.token);
        }

        state.notice = {
          type: "success",
          content: "Login successful.",
          id: Date.now(),
        };
      })
      .addCase(loginThunk.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Login failed.";

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
