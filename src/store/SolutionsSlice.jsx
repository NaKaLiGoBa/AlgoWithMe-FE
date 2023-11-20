import { createSlice } from '@reduxjs/toolkit';

export const solutionsSlice = createSlice({
  name: 'solutions',
  initialState: {
    totalCount: null,
    solutions: [],
    activeSolutionId: null,
  },
  reducers: {
    setSolutionsData: (state, action) => {
      state.totalCount = action.payload.totalCount;
      state.solutions = action.payload.solutions;
    },
    setActiveSolutionId: (state, action) => {
      state.activeSolutionId = action.payload;
    },
  },
});

export const { setSolutionsData, setActiveSolutionId } = solutionsSlice.actions;

export const selectActiveSolutionId = (state) => state.solutions.activeSolutionId;

export default solutionsSlice.reducer;
