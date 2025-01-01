import { createAsyncThunk } from "@reduxjs/toolkit";
import { ICategory } from "@customTypes/categories";
import axios from "axios";
import isAxiosErrorHandler from "@util/isAxiosErrorHandler";

const actGetCategories = createAsyncThunk(
  "categories/actGetCategories",
  async (_, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const responce = await axios.get<ICategory[]>("/category");
      return responce.data;
    } catch (error) {
      return rejectWithValue(isAxiosErrorHandler(error));
    }
  }
);

export default actGetCategories;
