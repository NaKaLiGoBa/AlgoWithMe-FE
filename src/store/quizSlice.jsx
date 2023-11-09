import { createSlice } from '@reduxjs/toolkit';

export const quizSlice = createSlice({
  name: 'quiz',
  initialState: {
    number: 1,
    totalCount: null,
  },
  reducers: {
    nextQuizNumber: (state) => {
      if (state.number <= state.totalCount) {
        state.number += 1;
      }
    },
  },
});

export const { nextQuizNumber } = quizSlice.actions;

export default quizSlice.reducer;
