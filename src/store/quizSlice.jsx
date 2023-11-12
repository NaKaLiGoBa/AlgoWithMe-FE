import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  quizzes: [],
  number: 0,
  totalCount: null,
  currentQuiz: {},
  selectedOption: null,
  initialAnswer: null,
  isAnswered: false,
  correctAnswer: null,
};
export const quizSlice = createSlice({
  name: 'quiz',
  initialState,
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
    setSelectedOption: (state, action) => {
      state.selectedOption = action.payload;
    },
    setInitialAnswer: (state, action) => {
      state.initialAnswer = action.payload;
    },
    setIsAnswered: (state, action) => {
      state.isAnswered = action.payload;
    },
    setCorrectAnswer: (state, action) => {
      state.correctAnswer = action.payload;
    },
    resetQuiz: () => initialState,
  },
});

export const {
  setQuizzes,
  nextQuizNumber,
  prevQuizNumber,
  setSelectedOption,
  setInitialAnswer,
  setIsAnswered,
  setCorrectAnswer,
  resetQuiz,
} = quizSlice.actions;

export default quizSlice.reducer;
