import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { TProduct } from "@types";
import isAxiosErrorHandler from "@util/isAxiosErrorHandler";
import { RootState } from "@store/index";

type TDataType = "productsFullInfo" | "ProductIds";
type TResponse = TProduct & { productId: number }[];

const actGetWishlist = createAsyncThunk(
  "wishlist/actGetWishlist",
  async (dataType: TDataType, thunkAPI) => {
    const { rejectWithValue, signal, getState } = thunkAPI;
    const { auth } = getState() as RootState;

    try {
      // Получение списка товаров в вишлисте
      const userWishlist = await axios.get<TResponse>(
        `/wishlist?userId=${auth.user?.id}`,
        {
          signal,
        }
      );

      if (!userWishlist.data.length) {
        return { data: [], dataType: "empty" };
      }

      // Извлекаем только id товаров из вишлиста
      if (dataType === "ProductIds") {
        const wishlistIds = userWishlist.data.map((item) => item.productId);
        return { data: wishlistIds, dataType: "ProductIds" };
      } else {
        // Получаем все товары
        const wishlistIds = userWishlist.data.map((item) => item.productId);
        const response = await axios.get<TProduct[]>("/products", { signal });

        // Фильтруем товары, оставляя только те, что есть в вишлисте
        const filteredItems = response.data.filter((el) =>
          wishlistIds.includes(el.id)
        );

        return { data: filteredItems, dataType: "productsFullInfo" };
      }
    } catch (error) {
      return rejectWithValue(isAxiosErrorHandler(error));
    }
  }
);

export default actGetWishlist;
