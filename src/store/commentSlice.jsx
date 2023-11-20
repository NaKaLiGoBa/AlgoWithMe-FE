import { createSlice } from '@reduxjs/toolkit';

export const commentSlice = createSlice({
  name: 'comment',
  initialState: {
    activeCommentId: null,
    activeReplyId: null,
  },
  reducers: {
    setActiveCommentId: (state, action) => {
      state.activeCommentId = action.payload;
    },
    setActiveReplyId: (state, action) => {
      state.activeReplyId = action.payload;
    },
  },
});

export const { setActiveCommentId, setActiveReplyId } = commentSlice.actions;

export const selectActiveCommentId = (state) => state.comment.activeCommentId;
export const selectActiveReplyId = (state) => state.comment.activeReplyId;

export default commentSlice.reducer;
