import { createSlice } from "@reduxjs/toolkit";
import { TLoading } from "@types";

interface IAuthState {
  loading: TLoading;
  error: string | null;
}

const initialState: IAuthState = {
  loading: "pending",
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  // extraReducers: {}
});

export const {} = authSlice.actions;
export default authSlice.reducer;
