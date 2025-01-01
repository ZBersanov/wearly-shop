import { createSlice } from "@reduxjs/toolkit";

import actGetProducts from "./act/actGetProducts";
import { isString, TProduct } from "@types";
import { TLoading } from "@types";

interface IProductsState {
  records: TProduct[];
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
      if (isString(action.payload)) {
        state.error = action.payload;
      }
    });
  },
});

export const { cleanProducts } = productsSlice.actions;
export { actGetProducts };
export default productsSlice.reducer;
