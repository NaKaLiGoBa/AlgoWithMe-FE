import { configureStore } from '@reduxjs/toolkit';
import tabReducer from './tabState';
import solutionsReducer from './SolutionsSlice';
import quizReducer from './quizSlice';

export default configureStore({
  reducer: {
    tabs: tabReducer,
    solutions: solutionsReducer,
    quiz: quizReducer,
  },
});
