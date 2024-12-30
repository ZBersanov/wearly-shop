import { createAsyncThunk } from "@reduxjs/toolkit";
import { IProduct } from "@customTypes/products";
import axios, { isAxiosError } from "axios";

const actGetProducts = createAsyncThunk(
  "products/actGetProducts",
  async (prefix: string, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const responce = await axios.get<IProduct[]>(
        `http://localhost:5005/products?cat_prefix=${prefix}`
      );
      return responce.data;
    } catch (error) {
      if (isAxiosError(error)) {
        rejectWithValue(error.response?.data.message || error.message);
      } else {
        rejectWithValue("Произошла непредвиденная ошибка");
      }
    }
  }
);

export default actGetProducts;
