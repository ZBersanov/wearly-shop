import { IProduct } from "@customTypes/products";
import { createSlice } from "@reduxjs/toolkit";
import { getCartTotalQuantitySelector } from "./selectors";
import actGetProductsByItems from "./act/actGetProductsByItems";
import { TLoading } from "@customTypes/shared";

interface ICartState {
  items: { [key: number]: number };
  productFullInfo: IProduct[];
  loading: TLoading;
  error: string | null;
}

const initialState: ICartState = {
  items: {},
  productFullInfo: [],
  loading: "pending",
  error: null,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const id = action.payload;
      if (state.items[id]) {
        state.items[id]++;
      } else {
        state.items[id] = 1;
      }
    },
    cartItemChangeQuantity: (state, action) => {
      state.items[action.payload.id] = action.payload.quantity;
    },
    removeCartItem: (state, action) => {
      delete state.items[action.payload];
      state.productFullInfo = state.productFullInfo.filter((el) => {
        return el.id !== action.payload;
      });
    },
    cleanFullProductInfo: (state) => {
      state.productFullInfo = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(actGetProductsByItems.pending, (state) => {
      state.loading = "pending";
      state.error = null;
    });
    builder.addCase(actGetProductsByItems.fulfilled, (state, action) => {
      state.loading = "successfull";
      state.productFullInfo = action.payload;
    });
    builder.addCase(actGetProductsByItems.rejected, (state, action) => {
      state.loading = "rejected";
      state.error = action.payload as string;
    });
  },
});

export { getCartTotalQuantitySelector, actGetProductsByItems };
export const {
  addToCart,
  cartItemChangeQuantity,
  removeCartItem,
  cleanFullProductInfo,
} = cartSlice.actions;
export default cartSlice.reducer;
