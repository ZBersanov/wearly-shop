import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { IProduct } from "@customTypes/products";

type TResponse = IProduct & { productId: number }[];

const actGetWishlist = createAsyncThunk(
  "wishlist/actGetWishlist",
  async (_, thunkAPI) => {
    const { rejectWithValue, fulfillWithValue } = thunkAPI;

    try {
      // Получение списка товаров в вишлисте
      const userWishlist = await axios.get<TResponse>("/wishlist?userId=1");

      if (!userWishlist.data.length) {
        return fulfillWithValue([]);
      }

      // Извлекаем только id товаров из вишлиста
      const wishlistIds = userWishlist.data.map((item) => item.productId);

      // Получаем все товары
      const response = await axios.get<IProduct[]>("/products");

      // Фильтруем товары, оставляя только те, что есть в вишлисте
      const filteredItems = response.data.filter((el) =>
        wishlistIds.includes(el.id)
      );

      return filteredItems;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data.message || error.message);
      } else {
        return rejectWithValue("An unexpected error");
      }
    }
  }
);

export default actGetWishlist;
