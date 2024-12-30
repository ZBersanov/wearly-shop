import { createAsyncThunk } from "@reduxjs/toolkit";
import { ICategory } from "@customTypes/categories";
import axios, { isAxiosError } from "axios";

const actGetCategories = createAsyncThunk(
  "categories/actGetCategories",
  async (_, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const responce = await axios.get<ICategory[]>("/category");
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

export default actGetCategories;
