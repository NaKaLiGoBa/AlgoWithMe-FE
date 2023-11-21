import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  problems: [],
  pageNumber: 0,
  totalPages: 0,
  totalElements: 0,
  size: 0,
  numberOfElements: 0,
  first: true,
  last: true,
  status: [],
  tags: [],
  difficulties: []
};

const problemsSlice = createSlice({
  name: 'problems',
  initialState,
  reducers: {
    setProblems(state, action) {
      return { ...state, ...action.payload };
    },
    // 추가적인 액션들을 여기에 정의할 수 있습니다.
  },
});

export const { setProblems } = problemsSlice.actions;
export default problemsSlice.reducer;
