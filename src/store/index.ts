import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice";
import generalSlice from "./general/generalSlice";
import breadCrumbSlice from "./breadCrumb/breadCrumbSlice";
import tagsViewStore from "./tagsView/tags-view.store";
import notificationSlice from "./notifications/notificationSlice";
import commentsSlice from "./comments/commentsSlice";
import smartSectionsSlice from "./smartSections/smartSectionsSlice";
import ordersSlice from "./orders/ordersSlice";
import promocodesSlice from "./promocodes/promocodesSlice";
import itemsSlice from "./items/itemsSlice";
import bannersSlice from "./banners/bannersSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    general: generalSlice,
    breadcrumb: breadCrumbSlice,
    tagsView: tagsViewStore,
    notifications: notificationSlice,
    comments: commentsSlice,
    orders: ordersSlice,
    smartSections: smartSectionsSlice,
    promocodes: promocodesSlice,
    items: itemsSlice,
    banners: bannersSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
