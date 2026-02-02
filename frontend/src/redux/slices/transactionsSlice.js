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

export const getTransactionsThunk = createAsyncThunk(
  "transactions/get",
  async (_, { rejectWithValue }) => {
    try {
      const res = await transactionApi.get();
      return res.data?.transactions;
    } catch (err) {
      return rejectWithValue(err);
    }
  },
);

export const updateTransactionThunk = createAsyncThunk(
  "transactions/update",
  async ({ id, categoryId, amount, transDate, note }, { rejectWithValue }) => {
    try {
      const res = await transactionApi.update(id, {
        categoryId,
        amount,
        transDate,
        note,
      });
      return res.data?.updatedTransaction;
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

    /**
     * get transactions
     */
    builder
      .addCase(getTransactionsThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getTransactionsThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.items = action.payload;
      })
      .addCase(getTransactionsThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    /**
     * update a transaction
     */
    builder
      .addCase(updateTransactionThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateTransactionThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;

        const updatedTransaction = action.payload;
        if (updatedTransaction.id != null) {
          const idx = state.items.findIndex(
            (t) => Number(t.id) === Number(updatedTransaction.id),
          );
          if (idx != -1) {
            state.items[idx] = updatedTransaction;
          }
        }
      })
      .addCase(updateTransactionThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default transactionsSlice.reducer;
