import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "@store/index";
import { IProduct } from "@customTypes/products";
import axios, { isAxiosError } from "axios";

type TResponse = IProduct[];

const actGetProductsByItems = createAsyncThunk(
  "cart/actGetProductsByItems",
  async (_, thunkAPI) => {
    const { getState, rejectWithValue, fulfillWithValue } = thunkAPI;
    const { cart } = getState() as RootState;
    const itemsId = Object.keys(cart.items);

    if (!itemsId.length) {
      return fulfillWithValue([]); // Если нет товаров в корзине, возвращаем пустой массив
    }

    try {
      // Получаем все продукты
      const response = await axios.get<TResponse>("/products");

      // Фильтруем полученные продукты по ID, которые есть в корзине
      const filteredProducts = response.data.filter(
        (product) => itemsId.includes(String(product.id)) // Фильтрация по ID из корзины
      );

      return filteredProducts; // Возвращаем отфильтрованные данные
    } catch (error) {
      if (isAxiosError(error)) {
        return rejectWithValue(error.response?.data.message || error.message);
      } else {
        return rejectWithValue("Произошла непредвиденная ошибка");
      }
    }
  }
);

export default actGetProductsByItems;
