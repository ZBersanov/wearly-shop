import { createSlice } from "@reduxjs/toolkit";
import actLikeToggle from "./act/actLikeToggle";
import actGetWishlist from "./act/actGetWishlist";
import { TLoading } from "@customTypes/shared";
import { IProduct } from "@customTypes/products";

interface IWishListState {
  itemsId: number[];
  productsFullInfo: IProduct[];
  error: null | string;
  loading: TLoading;
}

const initialState: IWishListState = {
  itemsId: [],
  productsFullInfo: [],
  error: null,
  loading: "pending",
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    cleanWishlist: (state) => {
      state.productsFullInfo = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(actLikeToggle.pending, (state) => {
      state.error = null;
    });
    builder.addCase(actLikeToggle.fulfilled, (state, action) => {
      if (action.payload?.type === "add") {
        state.itemsId.push(action.payload.id);
      } else {
        state.itemsId = state.itemsId.filter((el) => el !== action.payload?.id);
        state.productsFullInfo = state.productsFullInfo.filter(
          (el) => el.id !== action.payload.id
        );
      }
    });
    builder.addCase(actLikeToggle.rejected, (state, action) => {
      if (action.payload && typeof action.payload === "string") {
        state.error = action.payload;
      }
    });
    // wishlist items
    builder.addCase(actGetWishlist.pending, (state) => {
      state.loading = "pending";
      state.error = null;
    });
    builder.addCase(actGetWishlist.fulfilled, (state, action) => {
      state.loading = "successfull";
      state.productsFullInfo = action.payload;
      state.error = null;
    });
    builder.addCase(actGetWishlist.rejected, (state, action) => {
      state.loading = "rejected";
      if (action.payload && typeof action.payload === "string") {
        state.error = action.payload;
      }
    });
  },
});

export { actLikeToggle, actGetWishlist };
export const { cleanWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;