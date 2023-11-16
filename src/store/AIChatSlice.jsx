import { createSlice } from '@reduxjs/toolkit';

export const AIchatSlice = createSlice({
  name: 'chat',
  initialState: { isVisible: false, selectedOptions: [], currentScreen: 2 },
  reducers: {
    toggleChat: (state) => {
      state.isVisible = !state.isVisible;
    },
    setSelectedOptions: (state, action) => {
      const { option, checked } = action.payload;
      if (checked) {
        state.selectedOptions.push(option);
      } else {
        state.selectedOptions = state.selectedOptions.filter(
          (opt) => opt !== option,
        );
      }
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

export const { toggleChat, setSelectedOptions, prevScreen, nextScreen } =
  AIchatSlice.actions;

export default AIchatSlice.reducer;
