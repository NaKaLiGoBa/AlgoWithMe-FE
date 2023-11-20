import { configureStore } from '@reduxjs/toolkit';
import tabReducer from './tabState';
import solutionsReducer from './SolutionsSlice';
import quizReducer from './quizSlice';
import problemsReducer from './problemsSlice';
import problemReducer from './problemSlice';
import AIChatReducer from './AIChatSlice';

export default configureStore({
  reducer: {
    tabs: tabReducer,
    solutions: solutionsReducer,
    quiz: quizReducer,
    problems: problemsReducer,
    problem: problemReducer,
    chat: AIChatReducer,
  },
});
