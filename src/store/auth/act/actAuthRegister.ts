import { createAsyncThunk } from "@reduxjs/toolkit";
import isAxiosErrorHandler from "@util/isAxiosErrorHandler";
import axios from "axios";

type TFormData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

const actAuthRegister = createAsyncThunk(
  "auth/actAuthRegister",
  async (formData: TFormData, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;

    try {
      const response = await axios.post<TFormData>(`/register`, formData);
      return response.data;
    } catch (error) {
      return rejectWithValue(isAxiosErrorHandler(error));
    }
  }
);

export default actAuthRegister;
