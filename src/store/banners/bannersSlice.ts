import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TBanner, TBanners, TBannerSendInfo } from "../../types/banners";

type SliceState = {
  bannersData: TBanners;
  bannersSendInfo: TBannerSendInfo;
  bannerItemData: TBanner;
  bannerItemSendInfo: TBanner;
};

const initialState: SliceState = {
  bannersData: {
    data: [],
    isEnd: false,
  } as TBanners,
  bannersSendInfo: {
    offset: 0,
    limit: 20,
  },
  bannerItemData: {} as TBanner,
  bannerItemSendInfo: {} as TBanner,
};

const bannersSlice = createSlice({
  name: "banners",
  initialState,
  reducers: {
    setBannersData(state, action: PayloadAction<TBanners>) {
      state.bannersData = action.payload;
    },
    setBannersSendInfo(state, action: PayloadAction<TBannerSendInfo>) {
      state.bannersSendInfo = action.payload;
    },
    setBannerItemSendInfo(state, action: PayloadAction<TBanner>) {
      state.bannerItemSendInfo = action.payload;
    },
    setBannerItemData(state, action: PayloadAction<TBanner>) {
      state.bannerItemData = action.payload;
    },
  },
});

export const {
  setBannersData,
  setBannersSendInfo,
  setBannerItemData,
  setBannerItemSendInfo,
} = bannersSlice.actions;
export default bannersSlice.reducer;
