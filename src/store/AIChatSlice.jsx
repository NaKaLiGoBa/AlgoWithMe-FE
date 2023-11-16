import { createSlice } from '@reduxjs/toolkit';

export const AIchatSlice = createSlice({
  name: 'chat',
  initialState: {
    isVisible: false,
    selectedHintOption: null,
    currentScreen: 2,
  },
  reducers: {
    toggleChat: (state) => {
      state.isVisible = !state.isVisible;
    },
    setSelectedHintOption: (state, action) => {
      state.selectedHintOption = action.payload;
    },
    prevScreen: (state) => {
      if (state.currentScreen > 0) {
        state.currentScreen -= 1;
      }
    },
    nextScreen: (state) => {
      if (state.currentScreen < 2) {
        state.currentScreen += 1;
      }
    },
  },
});

export const { toggleChat, setSelectedHintOption, prevScreen, nextScreen } =
  AIchatSlice.actions;

export default AIchatSlice.reducer;
