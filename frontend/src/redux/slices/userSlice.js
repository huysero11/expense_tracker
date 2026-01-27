import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import userApi from "../../apis/userApi";

const initialState = {
  me: null,
  error: false,
  loading: null,
};

export const getMeThunk = createAsyncThunk(
  "user/getMe",
  async (_, { rejectWithValue }) => {
    try {
      const res = await userApi.getMe();
      /*res = {data: user} */
      return res?.data?.user;
    } catch (err) {
      return rejectWithValue(err || "Fetch user information failed!");
    }
  },
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    clearMe(state) {
      state.me = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    /**
     * Get user information
     */
    builder
      .addCase(getMeThunk.pending, (state) => {
        state.loading = "true";
        state.error = null;
      })
      .addCase(getMeThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.me = action.payload;
      })
      .addCase(getMeThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearMe } = userSlice.actions;
export default userSlice.reducer;
