import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import userApi from "../../apis/userApi";

const initialState = {
  me: null,
  error: false,
  loading: null,

  updating: false,
  updateError: null,
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

export const updateMeThunk = createAsyncThunk(
  "user/updateMe",
  async ({ fullName }, { rejectWithValue }) => {
    try {
      const res = await userApi.updateMe({ fullName });
      return res?.data?.updatedUser;
    } catch (err) {
      return rejectWithValue(err || "Failed to upate user!");
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

    // update
    builder
      .addCase(updateMeThunk.pending, (state) => {
        state.updating = true;
        state.updateError = null;
      })
      .addCase(updateMeThunk.fulfilled, (state, action) => {
        state.updating = false;
        state.me = action.payload; // IMPORTANT
      })
      .addCase(updateMeThunk.rejected, (state, action) => {
        state.updating = false;
        state.updateError = action.payload;
      });
  },
});

export const { clearMe } = userSlice.actions;
export default userSlice.reducer;
