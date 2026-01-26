import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import categoryApi from "../../apis/categoryApi";

export const getCategoriesThunk = createAsyncThunk(
  "categories/getAll",
  async ({ type } = {}, { rejectWithValue }) => {
    try {
      const res = await categoryApi.getAll(type ? { type } : {});
      return res;
    } catch (err) {
      const message =
        err?.response?.data?.message ||
        err?.response?.data?.error ||
        err?.message ||
        "Fetch categories failed!";
      return rejectWithValue(message);
    }
  },
);

export const createCategoryThunk = createAsyncThunk(
  "categories/create",
  async ({ name, type }, { rejectWithValue }) => {
    try {
      const res = await categoryApi.create({ name, type }); // new category created
      return res;
    } catch (err) {
      const message =
        err?.response?.data?.message ||
        err?.response?.data?.error ||
        err?.message ||
        "Create category failed!";
      return rejectWithValue(message);
    }
  },
);

export const updateCategoryThunk = createAsyncThunk(
  "categories/update",
  async ({ id, name, type }, { rejectWithValue }) => {
    try {
      const res = await categoryApi.update(id, { name, type }); // return updated category
      return res;
    } catch (err) {
      const message =
        err?.response?.data?.message ||
        err?.response?.data?.error ||
        err?.message ||
        "Update category failed!";
      return rejectWithValue(message);
    }
  },
);

export const deleteCategoryThunk = createAsyncThunk(
  "categories/delete",
  async (id, { rejectWithValue }) => {
    try {
      const res = await categoryApi.delete(id); // true / false
      return { res, id };
    } catch (err) {
      const message =
        err?.response?.data?.message ||
        err?.response?.data?.error ||
        err?.message ||
        "Delete category failed!";
      return rejectWithValue(message);
    }
  },
);

const initialState = {
  items: [], // [{id, userId, name, type},...]
  status: "idle",
  error: null,
  notice: null, // {type, content, id}
};

const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    clearCategoriesError(state) {
      state.error = null;
    },
    clearNotice(state) {
      state.notice = null;
    },
    resetCategoriesState() {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    /**
     * get all categories
     */
    builder
      .addCase(getCategoriesThunk.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(getCategoriesThunk.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.error = null;

        const categories = action.payload?.data?.categories;
        state.items = Array.isArray(categories) ? categories : [];
      })
      .addCase(getCategoriesThunk.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });

    /**
     * create a category
     */
    builder
      .addCase(createCategoryThunk.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(createCategoryThunk.fulfilled, (state, action) => {
        const newCategory = action.payload?.data?.category;

        if (newCategory?.id != null) {
          state.items = [...state.items, newCategory];
        }

        state.status = "succeeded";
        state.error = null;
      })
      .addCase(createCategoryThunk.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });

    /**
     * update a category
     */
    builder
      .addCase(updateCategoryThunk.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(updateCategoryThunk.fulfilled, (state, action) => {
        const updatedCategory = action.payload?.data?.updatedCategory;

        if (updatedCategory?.id != null) {
          const idx = state.items.findIndex(
            (c) => Number(c.id) === Number(updatedCategory.id),
          );
          if (idx != -1) {
            state.items[idx] = updatedCategory;
          }
        }

        state.status = "succeeded";
        state.error = null;
      })
      .addCase(updateCategoryThunk.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });

    /**
     * delete a category
     */
    builder
      .addCase(deleteCategoryThunk.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(deleteCategoryThunk.fulfilled, (state, action) => {
        const deletedCategoryId = action.payload.id;
        if (deletedCategoryId != null) {
          state.items = state.items.filter(
            (c) => Number(c.id) !== Number(deletedCategoryId),
          );
        }

        state.status = "succeeded";
        state.error = null;
      })
      .addCase(deleteCategoryThunk.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { clearCategoriesError, clearNotice, resetCategoriesState } =
  categoriesSlice.actions;
export default categoriesSlice.reducer;
