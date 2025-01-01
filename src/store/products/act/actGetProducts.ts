import { createAsyncThunk } from "@reduxjs/toolkit";
import { IProduct } from "@customTypes/products";
import axios from "axios";
import isAxiosErrorHandler from "@util/isAxiosErrorHandler";

const actGetProducts = createAsyncThunk(
  "products/actGetProducts",
  async (prefix: string, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const responce = await axios.get<IProduct[]>(
        `/products?cat_prefix=${prefix}`
      );
      return responce.data;
    } catch (error) {
      return rejectWithValue(isAxiosErrorHandler(error));
    }
  }
);

export default actGetProducts;
