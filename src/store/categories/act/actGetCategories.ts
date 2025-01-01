import { createAsyncThunk } from "@reduxjs/toolkit";
import { TCategory } from "@types";
import axios from "axios";
import isAxiosErrorHandler from "@util/isAxiosErrorHandler";

const actGetCategories = createAsyncThunk(
  "categories/actGetCategories",
  async (_, thunkAPI) => {
    const { rejectWithValue, signal } = thunkAPI;
    try {
      const responce = await axios.get<TCategory[]>("/category", { signal });
      return responce.data;
    } catch (error) {
      return rejectWithValue(isAxiosErrorHandler(error));
    }
  }
);

export default actGetCategories;
