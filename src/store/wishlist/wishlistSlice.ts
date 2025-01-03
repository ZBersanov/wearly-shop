import { createSlice } from "@reduxjs/toolkit";
import actLikeToggle from "./act/actLikeToggle";
import actGetWishlist from "./act/actGetWishlist";
import { isString, TLoading } from "@types";
import { TProduct } from "@types";
import { authLogout } from "@store/auth/authSlice";

interface IWishListState {
  itemsId: number[];
  productsFullInfo: TProduct[];
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
    // LIKE_TOGGLE
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
      if (isString(action.payload)) {
        state.error = action.payload;
      }
    });
    // WISHLIST ITEMS
    builder.addCase(actGetWishlist.pending, (state) => {
      state.loading = "pending";
      state.error = null;
    });
    builder.addCase(actGetWishlist.fulfilled, (state, action) => {
      state.loading = "successfull";
      if (action.payload.dataType === "productsFullInfo") {
        state.productsFullInfo = action.payload.data as TProduct[];
      } else {
        state.itemsId = action.payload.data as number[];
      }
    });

    builder.addCase(actGetWishlist.rejected, (state, action) => {
      state.loading = "rejected";
      if (isString(action.payload)) {
        state.error = action.payload;
      }
      state.itemsId = [];
      state.productsFullInfo = [];
    });
    // WHEN_LOGOUT
    builder.addCase(authLogout, (state) => {
      state.itemsId = [];
      state.productsFullInfo = [];
    });
  },
});

export { actLikeToggle, actGetWishlist };
export const { cleanWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;
