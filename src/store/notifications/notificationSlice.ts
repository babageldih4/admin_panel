import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  TNotificationItem,
  TNotifications,
  TNotificationSendInfo,
} from "../../types/notifications";
import { UploadFile } from "antd";

type SliceState = {
  notificationsData: TNotifications;
  notificationSendInfo: TNotificationSendInfo;
  notificationItemData: TNotificationItem;
  notificationItemSendInfo: TNotificationItem;
  notificationEmptyValues: string[];
  fileList: UploadFile[];
};

const initialState: SliceState = {
  notificationsData: {
    data: [],
    isEnd: false,
  } as TNotifications,
  notificationSendInfo: {
    offset: 0,
    limit: 20,
    search: "",
    active: "",
    divisonUuids: [],
  } as TNotificationSendInfo,
  notificationItemData: {} as TNotificationItem,
  notificationItemSendInfo: {
    uuid: "",
    titleTm: "",
    titleRu: "",
    bodyTm: "",
    bodyRu: "",
    endDate: "",
    link: "",
    items: [],
    brands: [],
    mainGroups: [],
    lastGroups: [],
    paretto: [],
    timeToLive: 48,
    actionType: {
      value: "news",
      label: "Habar",
    },
    divisions: [],
    imageRu: "",
    imageTm: "",
    onlyNews: false,
    order: [],
    productDiscount: false,
    publishedTime: "",
  } as TNotificationItem,
  notificationEmptyValues: [],
  fileList: [],
};

const notificationSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    setNotificationsData(state, action: PayloadAction<TNotifications>) {
      state.notificationsData = action.payload;
    },
    setNotificationSendInfo(
      state,
      action: PayloadAction<TNotificationSendInfo>
    ) {
      state.notificationSendInfo = action.payload;
    },

    setNotificationItemData(state, action: PayloadAction<TNotificationItem>) {
      state.notificationItemData = action.payload;
    },
    setNotificationItemSendInfo(
      state,
      action: PayloadAction<TNotificationItem>
    ) {
      state.notificationItemSendInfo = action.payload;
    },
    setNotificationEmptyValues(state, action: PayloadAction<string[]>) {
      state.notificationEmptyValues = action.payload;
    },
    setFileList(state, action: PayloadAction<UploadFile[]>) {
      state.fileList = action.payload;
    },
  },
});

export const {
  setNotificationsData,
  setNotificationItemData,
  setNotificationSendInfo,
  setNotificationItemSendInfo,
  setNotificationEmptyValues,
  setFileList,
} = notificationSlice.actions;
export default notificationSlice.reducer;
