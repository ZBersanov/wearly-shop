import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { TProduct } from "@types";
import isAxiosErrorHandler from "@util/isAxiosErrorHandler";

type TResponse = TProduct & { productId: number }[];

const actGetWishlist = createAsyncThunk(
  "wishlist/actGetWishlist",
  async (_, thunkAPI) => {
    const { rejectWithValue, fulfillWithValue, signal } = thunkAPI;

    try {
      // Получение списка товаров в вишлисте
      const userWishlist = await axios.get<TResponse>("/wishlist?userId=1", {
        signal,
      });

      if (!userWishlist.data.length) {
        return fulfillWithValue([]);
      }

      // Извлекаем только id товаров из вишлиста
      const wishlistIds = userWishlist.data.map((item) => item.productId);

      // Получаем все товары
      const response = await axios.get<TProduct[]>("/products", { signal });

      // Фильтруем товары, оставляя только те, что есть в вишлисте
      const filteredItems = response.data.filter((el) =>
        wishlistIds.includes(el.id)
      );

      return filteredItems;
    } catch (error) {
      return rejectWithValue(isAxiosErrorHandler(error));
    }
  }
);

export default actGetWishlist;
