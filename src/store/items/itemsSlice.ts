import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TItems, TItemSendsInfo } from "../../types/items";

type SliceState = {
  itemsData: TItems;
  itemsSendInfo: TItemSendsInfo;
};

const initialState: SliceState = {
  itemsData: {
    data: [],
    isEnd: false,
  } as TItems,
  itemsSendInfo: {
    offset: 0,
    limit: 20,
  } as TItemSendsInfo,
};

const itemsSlice = createSlice({
  name: "items",
  initialState,
  reducers: {
    setItemsData(state, action: PayloadAction<TItems>) {
      state.itemsData = action.payload;
    },
    setItemsSendInfo(state, action: PayloadAction<TItemSendsInfo>) {
      state.itemsSendInfo = action.payload;
    },
  },
});

export const { setItemsData, setItemsSendInfo } = itemsSlice.actions;
export default itemsSlice.reducer;
