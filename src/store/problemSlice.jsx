import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  number: 0,
  status: '',
  title: '',
  acceptance: '',
  difficulty: '',
  description: '',
  defaultCodes: {
    java: '',
    python: '',
    javascript: '',
  },
  testcases: [
    {
      number: 0,
      inputs: [
        {
          name: '',
          value: '',
        },
      ],
      expected: '',
    },
  ],
  tags: [],
  totalSolutionCount: 0,
};

const problemSlice = createSlice({
  name: 'problem',
  initialState,
  reducers: {
    setProblem(state, action) {
      return { ...state, ...action.payload };
    },
    // 추가적인 액션들을 여기에 정의할 수 있습니다.
  },
});

export const { setProblem } = problemSlice.actions;
export default problemSlice.reducer;
