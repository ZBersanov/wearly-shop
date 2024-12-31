import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { isAxiosError } from "axios";

const actLikeToggle = createAsyncThunk(
  "wishlist/actLikeToggle",
  async (id: number, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const isRecordExist = await axios.get(
        `/wishlist?userId=1&productId=${id}`
      );

      if (isRecordExist.data.length > 0) {
        await axios.delete(`/wishlist/${isRecordExist.data[0].id}`);
        return { type: "remove", id } as { type: string; id: number };
      } else {
        await axios.post("/wishlist", { userId: "1", productId: id });
        return { type: "add", id } as { type: string; id: number };
      }
    } catch (error) {
      if (isAxiosError(error)) {
        return rejectWithValue(error.response?.data.message || error.message);
      }
      return rejectWithValue("Произошла непредвиденная ошибка");
    }
  }
);

export default actLikeToggle;
