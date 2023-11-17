import { createSlice } from '@reduxjs/toolkit';

export const AIchatSlice = createSlice({
  name: 'chat',
  initialState: {
    isVisible: false,
    selectedHintOption: null,
    currentScreen: 2,
    selectedProblemId: null,
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
    setSeletedProblemId: (state, action) => {
      state.selectedProblemId = action.payload;
    },
  },
});

export const {
  toggleChat,
  setSelectedHintOption,
  prevScreen,
  nextScreen,
  setSeletedProblemId,
} = AIchatSlice.actions;

export default AIchatSlice.reducer;
