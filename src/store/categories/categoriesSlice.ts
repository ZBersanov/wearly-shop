import { createSlice } from "@reduxjs/toolkit";

import actGetCategories from "./act/actGetCategories";
import { TLoading } from "@customTypes/shared";
import { ICategory } from "@customTypes/categories";

interface ICategoriesState {
  records: ICategory[];
  loading: TLoading;
  error: string | null;
}

const initialState: ICategoriesState = {
  records: [],
  loading: "pending",
  error: null,
};

const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    cleanCategories: (state) => {
      state.records = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(actGetCategories.pending, (state) => {
      state.loading = "pending";
      state.error = null;
    });
    builder.addCase(actGetCategories.fulfilled, (state, action) => {
      state.loading = "successfull";
      state.records = action.payload ?? [];
      state.error = null;
    });
    builder.addCase(actGetCategories.rejected, (state, action) => {
      state.loading = "rejected";
      state.error = action.payload as string;
    });
  },
});

export { actGetCategories };
export const { cleanCategories } = categoriesSlice.actions;
export default categoriesSlice.reducer;
