import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "@store/index";
import { TProduct } from "@types";
import axios from "axios";
import isAxiosErrorHandler from "@util/isAxiosErrorHandler";

type TResponse = TProduct[];

const actGetProductsByItems = createAsyncThunk(
  "cart/actGetProductsByItems",
  async (_, thunkAPI) => {
    const { getState, rejectWithValue, fulfillWithValue, signal } = thunkAPI;
    const { cart } = getState() as RootState;
    const itemsId = Object.keys(cart.items);

    if (!itemsId.length) {
      return fulfillWithValue([]); // Если нет товаров в корзине, возвращаем пустой массив
    }

    try {
      // Получаем все продукты
      const response = await axios.get<TResponse>("/products", { signal });

      // Фильтруем полученные продукты по ID, которые есть в корзине
      const filteredProducts = response.data.filter(
        (product) => itemsId.includes(String(product.id)) // Фильтрация по ID из корзины
      );

      return filteredProducts; // Возвращаем отфильтрованные данные
    } catch (error) {
      return rejectWithValue(isAxiosErrorHandler(error));
    }
  }
);

export default actGetProductsByItems;
