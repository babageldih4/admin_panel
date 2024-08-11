import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TOrders, TOrdersSendInfo } from "../../types/orders";

type SliceState = {
  ordersData: TOrders;
  ordersSendInfo: TOrdersSendInfo;
};

const initialState: SliceState = {
  ordersData: {
    data: [],
    isEnd: false,
  } as TOrders,
  ordersSendInfo: {
    offset: 0,
    limit: 20,
    divisonUuids: undefined,
    // status: ["waitingForConfirmation", "reviewing", "picking", "delivering"],
  } as TOrdersSendInfo,
};

const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    setOrdersData(state, action: PayloadAction<TOrders>) {
      state.ordersData = action.payload;
    },
    setOrdersSendInfo(state, action: PayloadAction<TOrdersSendInfo>) {
      state.ordersSendInfo = action.payload;
    },
  },
});

export const { setOrdersData, setOrdersSendInfo } = ordersSlice.actions;
export default ordersSlice.reducer;
