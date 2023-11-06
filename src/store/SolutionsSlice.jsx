import { createSlice } from '@reduxjs/toolkit';

export const solutionsSlice = createSlice({
  name: 'solutions',
  initialState: {
    totalCount: null,
    solutions: [],
  },
  reducers: {
    setSolutionsData: (state, action) => {
      state.totalCount = action.payload.totalCount;
      state.solutions = action.payload.solutions;
    },
  },
});

export const { setSolutionsData } = solutionsSlice.actions;

export default solutionsSlice.reducer;
