import type { PayloadAction } from "@reduxjs/toolkit";

import { createSlice } from "@reduxjs/toolkit";

import { TButtonLoading, TOptions } from "../../types/generalType";
import { TItem } from "../../types/items";

type SliceState = {
  searchValue: string;
  isSidebarOpen: boolean;
  isModalOpen: boolean;
  userTheme: any;
  languages: { label: string; key: string }[];
  language: string;
  buttonLoading: TButtonLoading;
  isLoading: boolean;
  revalidateAll: string[];
  breadcrumbs: { title: any; path?: string }[];
  // isSearchModalOpen: any;
  isSearchModalOpen: boolean;
  isProductsSelectModalOpen: boolean;
  filterExists: boolean;
  tags: { label: string; key?: string }[];
  isPopoverOpen: boolean;
  divisionOptions: TOptions;
  discountOptions: TOptions;
  brandsOptions: TOptions;
  mainGroupsOptions: TOptions;
  isSettingsModalOpen: boolean;
  hasEmtpy: boolean;
  // uploadImages: {}[];
  // uploadImages: { [key: string]: any }[];
  uploadImages: object;
  selectedProducts: TItem[];
  openPromocodeModal: boolean;
};

const initialState: SliceState = {
  searchValue: "",
  isSidebarOpen: false,
  isModalOpen: false,
  // userTheme: null,
  languages: [],
  buttonLoading: {
    save: false,
    transferResponsibility: false,
    delete: false,
    submit: false,
    readNotification: false,
    unreadNotification: false,
    reassignTask: false,
    makeTaskDone: false,
    rejectTask: false,
    reevaluateTask: false,
    ok: false,
    ficheItemDelete: false,
    accept: false,
    merge: false,
  },
  isLoading: false,
  revalidateAll: [],
  breadcrumbs: [],
  // isSearchModalOpen: {},
  // isSearchModalOpen: {},
  isSearchModalOpen: false,
  isProductsSelectModalOpen: false,
  filterExists: false,
  tags: [],
  isPopoverOpen: false,
  language: localStorage.getItem("I18N_LANGUAGE") ?? "tk",
  divisionOptions: { data: [], isEnd: false },
  discountOptions: { data: [], isEnd: false },
  brandsOptions: { data: [], isEnd: false },
  mainGroupsOptions: { data: [], isEnd: false },
  isSettingsModalOpen: false,
  userTheme: localStorage.getItem("userTheme")
    ? JSON.parse(localStorage.getItem("userTheme")!)
    : {
        colorPrimary: "#1677ff",
        mode: window.matchMedia("(prefers-color-scheme:dark)")?.matches
          ? "dark"
          : "light",
        compact: false,
        stretch: false,
      },
  hasEmtpy: false,
  uploadImages: {},
  selectedProducts: [],
};

const generalSlice = createSlice({
  name: "general",
  initialState,
  reducers: {
    setSearchValue(state, action: PayloadAction<string>) {
      state.searchValue = action.payload;
    },
    setIsSidebarOpen(state, action: PayloadAction<boolean>) {
      state.isSidebarOpen = action.payload;
    },
    setIsPopoverOpen(state, action: PayloadAction<boolean>) {
      state.isPopoverOpen = action.payload;
    },
    setUserTheme(state, action: PayloadAction<any>) {
      state.userTheme = action.payload;
    },
    setLanguages(
      state,
      action: PayloadAction<{ label: string; key: string }[]>
    ) {
      state.languages = action.payload;
    },
    setFilterExists(state, action: PayloadAction<boolean>) {
      state.filterExists = action.payload;
    },
    setLanguage(state, action: PayloadAction<string>) {
      state.language = action.payload;
    },
    setButtonLoading(state, action: PayloadAction<TButtonLoading>) {
      state.buttonLoading = { ...state.buttonLoading, ...action.payload };
    },
    setIsLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
    setRevalidateAll(state, action: PayloadAction<string[]>) {
      state.revalidateAll = action.payload;
    },
    setIsProductsSelectModalOpen(state, action: PayloadAction<boolean>) {
      state.isProductsSelectModalOpen = action.payload;
    },
    setBreadcrumbs(
      state,
      action: PayloadAction<{ title: any; path?: string }[]>
    ) {
      state.breadcrumbs = action.payload;
    },
    setIsSearchModalOpen(state, action: PayloadAction<boolean>) {
      state.isSearchModalOpen = action.payload;
    },
    setTags(state, action: PayloadAction<{ label: any; key?: string }[]>) {
      state.tags = action.payload;
    },
    setIsModalOpen(state, action: PayloadAction<boolean>) {
      state.isModalOpen = action.payload;
    },
    setDivisionOptions(state, action: PayloadAction<TOptions>) {
      state.divisionOptions = action.payload;
    },
    setDiscountOptions(state, action: PayloadAction<TOptions>) {
      state.discountOptions = action.payload;
    },
    setBrandsOptions(state, action: PayloadAction<TOptions>) {
      state.brandsOptions = action.payload;
    },
    setMainGroupsOptions(state, action: PayloadAction<TOptions>) {
      state.mainGroupsOptions = action.payload;
    },

    setIsSettingsModalOpen(state, action: PayloadAction<boolean>) {
      state.isSettingsModalOpen = action.payload;
    },
    setHasEmtpy(state, action: PayloadAction<boolean>) {
      state.hasEmtpy = action.payload;
    },
    setUploadImages(state, action: PayloadAction<object>) {
      state.uploadImages = action.payload;
    },
    setSelectedProducts(state, action: PayloadAction<TItem[]>) {
      state.selectedProducts = action.payload;
    },
  },
});

export const {
  setSearchValue,
  setIsSidebarOpen,
  setIsModalOpen,
  setUserTheme,
  setBreadcrumbs,
  setButtonLoading,
  setIsLoading,
  setRevalidateAll,
  setIsProductsSelectModalOpen,
  setIsSearchModalOpen,
  setFilterExists,
  setTags,
  setIsPopoverOpen,
  setDivisionOptions,
  setDiscountOptions,
  setBrandsOptions,
  setMainGroupsOptions,
  setIsSettingsModalOpen,
  setHasEmtpy,
  setUploadImages,
  setSelectedProducts,
} = generalSlice.actions;
export default generalSlice.reducer;
