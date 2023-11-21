import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isVisible: false,
  selectedHintOption: null,
  currentScreen: 2,
  selectedProblemId: null,
  actualProblemId: null,
};
export const AIchatSlice = createSlice({
  name: 'chat',
  initialState,
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
    setActualProblemId: (state, action) => {
      state.actualProblemId = action.payload;
    },
    resetAIChat: () => initialState,
  },
});

export const {
  toggleChat,
  setSelectedHintOption,
  prevScreen,
  nextScreen,
  setSeletedProblemId,
  setActualProblemId,
  resetAIChat,
} = AIchatSlice.actions;

export default AIchatSlice.reducer;
