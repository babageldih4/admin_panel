import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  TSmartSections,
  TSmartSectionsItem,
  TSmartSectionsSendInfo,
} from "../../types/smartSections";
import { setNotificationItemSendInfo } from "../notifications/notificationSlice";

type SliceState = {
  smartSectionsData: TSmartSections;
  smartSectionsSendInfo: TSmartSectionsSendInfo;
  smartSectionsItemData: TSmartSectionsItem;
  smartSectionsItemSendInfo: TSmartSectionsItem;
};

const initialState: SliceState = {
  smartSectionsData: {
    data: [],
    isEnd: false,
  } as TSmartSections,
  smartSectionsSendInfo: {
    offset: 0,
    limit: 20,
    search: "",
    active: "",
    divisonUuids: [],
  } as TSmartSectionsSendInfo,
  smartSectionsItemData: {} as TSmartSectionsItem,
  smartSectionsItemSendInfo: {} as TSmartSectionsItem,
};

const smartSectionsSlice = createSlice({
  name: "smartSections",
  initialState,
  reducers: {
    setSmartSectionsData(state, action: PayloadAction<TSmartSections>) {
      state.smartSectionsData = action.payload;
    },
    setSmartSectionsSendInfo(
      state,
      action: PayloadAction<TSmartSectionsSendInfo>
    ) {
      state.smartSectionsSendInfo = action.payload;
    },
    setSmartSectionsItemData(state, action: PayloadAction<TSmartSectionsItem>) {
      state.smartSectionsItemData = action.payload;
    },
    setNotificationItemSendInfo(
      state,
      action: PayloadAction<TSmartSectionsItem>
    ) {
      state.smartSectionsItemSendInfo = action.payload;
    },
  },
});

export const {
  setSmartSectionsData,
  setSmartSectionsSendInfo,
  setSmartSectionsItemData,
} = smartSectionsSlice.actions;
export default smartSectionsSlice.reducer;

/*

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  TNotificationItemType,
  TNotifications,
  TNotificationSendInfo,
  TNotification,
} from "../../types/notifications";

type SliceState = {
  notificationsData: TNotifications;
  notificationSendInfo: TNotificationSendInfo;
  notificationItemData: TNotificationItemType;
};

const initialState: SliceState = {
  notificationsData: {
    data: [],
    isEnd: false,
  } as TNotifications,
  notificationSendInfo: {
    offset: 0,
    limit: 20,
  } as TNotificationSendInfo,
  notificationItemData: {} as TNotificationItemType,
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

    setNotificationItemData(
      state,
      action: PayloadAction<TNotificationItemType>
    ) {
      state.notificationItemData = action.payload;
    },
  },
});

export const {
  setNotificationsData,
  setNotificationItemData,
  setNotificationSendInfo,
} = notificationSlice.actions;
export default notificationSlice.reducer;



*/
