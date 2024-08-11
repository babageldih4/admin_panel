import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  TCodesItemSendInfo,
  TPromocodes,
  TPromocodesItem,
  TPromocodesSendInfo,
} from "../../types/promocodes";

type SliceState = {
  promocodesData: TPromocodes;
  promocodesSendInfo: TPromocodesSendInfo;
  promocodeItem: TPromocodesItem;
  promocodeItemSendInfo: TPromocodesItem;
  codesData: TPromocodes;
  codesSendInfo: TPromocodesSendInfo;
  codesItemSendInfo: TCodesItemSendInfo;
  generatePromocodeSlice: { code: string };
  isCodeModalOpen: boolean;
};

const initialState: SliceState = {
  promocodesData: {
    data: [],
    isEnd: false,
  } as TPromocodes,
  promocodesSendInfo: {
    offset: 0,
    limit: 15,
    active: true,
  } as TPromocodesSendInfo,
  promocodeItem: {} as TPromocodesItem,
  promocodeItemSendInfo: {
    uuid: "",
    nameTm: "",
    nameRu: "",
    divisions: [],
    countOfUsage: 1,
    allUsersHaveAccess: false,
    active: true,
    startDate: "",
    endDate: "",
    erpSyncCode: "",
  } as TPromocodesItem,
  codesData: {
    data: [],
    isEnd: false,
  } as TPromocodes,
  codesSendInfo: {
    offset: 0,
    limit: 15,
  } as TPromocodesSendInfo,
  codesItemSendInfo: {
    currencyId: 158,
    active: true,
    unlimited: false,
    addOnlyClientDiscount: false,
  } as TCodesItemSendInfo,
  generatePromocodeSlice: { code: "" },
  isCodeModalOpen: false,
};

const promocodesSlice = createSlice({
  name: "proomodes",
  initialState,
  reducers: {
    setPromocodesData(state, action: PayloadAction<TPromocodes>) {
      state.promocodesData = action.payload;
    },
    setPromocodesSendInfo(state, action: PayloadAction<TPromocodesSendInfo>) {
      state.promocodesSendInfo = action.payload;
    },
    setPromocodesItem(state, action: PayloadAction<TPromocodesItem>) {
      state.promocodeItem = action.payload;
    },
    setPromocodesItemSendInfo(state, action: PayloadAction<TPromocodesItem>) {
      state.promocodeItemSendInfo = action.payload;
    },
    setCodesData(state, action: PayloadAction<TPromocodes>) {
      state.codesData = action.payload;
    },
    setCodesSendInfo(state, action: PayloadAction<TPromocodesSendInfo>) {
      state.codesSendInfo = action.payload;
    },
    setCodesItemSendInfo(state, action: PayloadAction<TCodesItemSendInfo>) {
      state.codesItemSendInfo = action.payload;
    },
    setGeneratePromocodeSlice(state, action: PayloadAction<{ code: string }>) {
      state.generatePromocodeSlice = action.payload;
    },
    setIsCodeModalOpen(state, action: PayloadAction<boolean>) {
      state.isCodeModalOpen = action.payload;
    },
  },
});

export const {
  setPromocodesData,
  setPromocodesSendInfo,
  setPromocodesItem,
  setPromocodesItemSendInfo,
  setCodesSendInfo,
  setCodesItemSendInfo,
  setGeneratePromocodeSlice,
  setIsCodeModalOpen,
} = promocodesSlice.actions;
export default promocodesSlice.reducer;
