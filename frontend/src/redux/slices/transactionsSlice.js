import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import transactionApi from "../../apis/transactionApi";

const initialState = {
  items: [],
  loading: false,
  error: null,
};

export const createTransactionThunk = createAsyncThunk(
  "transactions/create",
  async ({ categoryId, amount, transDate, note }, { rejectWithValue }) => {
    try {
      const res = await transactionApi.create({
        categoryId,
        amount,
        transDate,
        note,
      });
      return res.data?.transaction;
    } catch (err) {
      return rejectWithValue(err);
    }
  },
);

const transactionsSlice = createSlice({
  name: "transactions",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    /**
     * create
     */
    builder
      .addCase(createTransactionThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createTransactionThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.items.unshift(action.payload);
      })
      .addCase(createTransactionThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default transactionsSlice.reducer;
