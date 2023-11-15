import { createSlice } from '@reduxjs/toolkit';

export const AIchatSlice = createSlice({
  name: 'chat',
  initialState: { isVisible: false },
  reducers: {
    toggleChat: (state) => {
      state.isVisible = !state.isVisible;
    },
  },
});

export const { toggleChat } = AIchatSlice.actions;

export default AIchatSlice.reducer;
