import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { cookieGetter } from "../../functions/index";

type SliceState = {
  token: string;
};

const initialState: SliceState = {
  token:
    cookieGetter("access_token") ||
    sessionStorage.getItem("access_token") ||
    "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken(state, action: PayloadAction<string>) {
      state.token = action.payload;
    },
  },
});

export const { setToken } = authSlice.actions;
export default authSlice.reducer;
