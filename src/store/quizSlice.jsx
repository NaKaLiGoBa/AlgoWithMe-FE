import { createSlice } from '@reduxjs/toolkit';

export const quizSlice = createSlice({
  name: 'quiz',
  initialState: {
    quizzes: [],
    number: 0,
    totalCount: null,
    currentQuiz: {},
  },
  reducers: {
    setQuizzes: (state, action) => {
      state.quizzes = action.payload.quizzes;
      state.totalCount = action.payload.quizCount;
      state.currentQuiz = action.payload.quizzes[state.number];
    },
    nextQuizNumber: (state) => {
      if (state.number < state.totalCount - 1) {
        state.number += 1;
        state.currentQuiz = state.quizzes[state.number];
      }
    },
    prevQuizNumber: (state) => {
      if (state.number > 0) {
        state.number -= 1;
        state.currentQuiz = state.quizzes[state.number];
      }
    },
  },
});

export const { setQuizzes, nextQuizNumber, prevQuizNumber } = quizSlice.actions;

export default quizSlice.reducer;
