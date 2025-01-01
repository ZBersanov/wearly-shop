import { createAsyncThunk } from "@reduxjs/toolkit";
import isAxiosErrorHandler from "@util/isAxiosErrorHandler";
import axios from "axios";

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
      return rejectWithValue(isAxiosErrorHandler(error));
    }
  }
);

export default actLikeToggle;
