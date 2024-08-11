import type { TagItemType, TagState } from "../../interface/tagsView.interface";
import type { PayloadAction } from "@reduxjs/toolkit";

import { createSlice } from "@reduxjs/toolkit";

const initialState: TagState = {
  activeTagId: location.pathname,
  tags: [],
};

const tagsViewSlice = createSlice({
  name: "tagsView",
  initialState,
  reducers: {
    setActiveTag(state, action: PayloadAction<string>) {
      state.activeTagId = action.payload;
    },
    // addTag(state, action: PayloadAction<TagItem>) {
    //   if (!state.tags.find((tag) => tag.path === action.payload.path)) {
    //     state.tags.push(action.payload);
    //   }

    //   state.activeTagId = action.payload.path;
    // },
    addTag(state, action: PayloadAction<TagItemType>) {
      if (!state.tags.find((tag) => tag.key === action.payload.key)) {
        state.tags.push(action.payload);
      }

      state.activeTagId = action.payload.key;
    },
    removeTag(state, action: PayloadAction<string>) {
      const targetKey = action.payload;
      // dashboard cloud't be closed
      console.log("targetKey::s", targetKey);
      console.log(state.tags);

      // if (targetKey === state.tags[0].key) {
      //   return;
      // }

      const activeTagId = state.activeTagId;
      let lastIndex = 0;

      state.tags.forEach((tag, i) => {
        if (tag.key === targetKey) {
          state.tags.splice(i, 1);
          lastIndex = i - 1;
        }
      });
      const tagList = state.tags.filter((tag) => tag.key !== targetKey);

      if (tagList.length && activeTagId === targetKey) {
        if (lastIndex >= 0) {
          state.activeTagId = tagList[lastIndex].key;
        } else {
          state.activeTagId = tagList[0].key;
        }
      }
    },
    removeAllTag(state) {
      state.activeTagId = state.tags[0].key;
      state.tags = [state.tags[0]];
    },
    removeOtherTag(state) {
      const activeTag = state.tags.find((tag) => tag.key === state.activeTagId);
      const activeIsDashboard = activeTag!.key === state.tags[0].key;

      state.tags = activeIsDashboard
        ? [state.tags[0]]
        : [state.tags[0], activeTag!];
    },
  },
});

export const { setActiveTag, addTag, removeTag, removeAllTag, removeOtherTag } =
  tagsViewSlice.actions;

export default tagsViewSlice.reducer;
