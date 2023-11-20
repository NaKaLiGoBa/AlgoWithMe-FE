import { configureStore } from '@reduxjs/toolkit';
import tabReducer from './tabState';
import solutionsReducer from './SolutionsSlice';
import quizReducer from './quizSlice';
import problemsReducer from './problemsSlice';
import problemReducer from './problemSlice';
import userReducer from './userSlice';
import commentReducer from './commentSlice';

export default configureStore({
  reducer: {
    tabs: tabReducer,
    solutions: solutionsReducer,
    quiz: quizReducer,
    problems: problemsReducer,
    problem: problemReducer,
    user: userReducer,
    comment: commentReducer,
  },
});
