import { createSlice } from "@reduxjs/toolkit";

import actGetProducts from "./act/actGetProducts";
import { IProduct } from "@customTypes/products";
import { TLoading } from "@customTypes/shared";

interface IProductsState {
  records: IProduct[];
  loading: TLoading;
  error: string | null;
}

const initialState: IProductsState = {
  records: [],
  loading: "pending",
  error: null,
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    cleanProducts: (state) => {
      state.records = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(actGetProducts.pending, (state) => {
      state.loading = "pending";
      state.error = null;
    });
    builder.addCase(actGetProducts.fulfilled, (state, action) => {
      state.loading = "successfull";
      state.records = action.payload ?? [];
      state.error = null;
    });
    builder.addCase(actGetProducts.rejected, (state, action) => {
      state.loading = "rejected";
      state.error = action.payload as string;
    });
  },
});

export const { cleanProducts } = productsSlice.actions;
export { actGetProducts };
export default productsSlice.reducer;
