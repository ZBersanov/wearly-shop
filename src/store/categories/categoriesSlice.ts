import { createSlice } from "@reduxjs/toolkit";

import actGetCategories from "./act/actGetCategories";
import { TLoading } from "@customTypes/shared";

interface ICategory {
  id: number;
  title: string;
  prefix: string;
  img: string;
}

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
  reducers: {},
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
export default categoriesSlice.reducer;
