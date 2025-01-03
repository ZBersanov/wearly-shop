import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "@store/index";
import isAxiosErrorHandler from "@util/isAxiosErrorHandler";
import axios from "axios";

const actLikeToggle = createAsyncThunk(
  "wishlist/actLikeToggle",
  async (id: number, thunkAPI) => {
    const { rejectWithValue, getState } = thunkAPI;
    const { auth } = getState() as RootState;

    if (!auth.user?.id) {
      return rejectWithValue("User not authenticated");
    }
    try {
      const isRecordExist = await axios.get(
        `/wishlist?userId=${auth.user.id}&productId=${id}`
      );

      if (isRecordExist.data.length > 0) {
        await axios.delete(`/wishlist/${isRecordExist.data[0].id}`);
        return { type: "remove", id } as { type: string; id: number };
      } else {
        await axios.post("/wishlist", { userId: auth.user?.id, productId: id });
        return { type: "add", id } as { type: string; id: number };
      }
    } catch (error) {
      return rejectWithValue(isAxiosErrorHandler(error));
    }
  }
);

export default actLikeToggle;
