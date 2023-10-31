import { configureStore } from '@reduxjs/toolkit';
import tabReducer from './tabState';

export default configureStore({
  reducer: {
    tabs: tabReducer,
  },
});
