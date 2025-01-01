import { createAsyncThunk } from "@reduxjs/toolkit";
import { TProduct } from "@types";
import axios from "axios";
import isAxiosErrorHandler from "@util/isAxiosErrorHandler";

const actGetProducts = createAsyncThunk(
  "products/actGetProducts",
  async (prefix: string, thunkAPI) => {
    const { rejectWithValue, signal } = thunkAPI;
    try {
      const responce = await axios.get<TProduct[]>(
        `/products?cat_prefix=${prefix}`,
        { signal }
      );
      return responce.data;
    } catch (error) {
      return rejectWithValue(isAxiosErrorHandler(error));
    }
  }
);

export default actGetProducts;
