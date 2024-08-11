import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TComment, TComments, TCommentsSendInfo } from "../../types/comment";

type SliceState = {
  commentsData: TComments;
  commentsSendInfo: TCommentsSendInfo;
};

const initialState: SliceState = {
  commentsData: {
    data: [],
    isEnd: false,
  } as TComments,
  commentsSendInfo: {
    offset: 0,
    limit: 20,
  } as TCommentsSendInfo,
};

const commentsSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {
    setCommentsData(state, action: PayloadAction<TComments>) {
      state.commentsData = action.payload;
    },
    setCommentsSendInfo(state, action: PayloadAction<TCommentsSendInfo>) {
      state.commentsSendInfo = action.payload;
    },
  },
});

export const { setCommentsData, setCommentsSendInfo } = commentsSlice.actions;
export default commentsSlice.reducer;
