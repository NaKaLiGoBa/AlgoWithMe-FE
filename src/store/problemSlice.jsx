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
    setTestcases(state, action) {
      // testcases 필드만 업데이트
      state.testcases = action.payload;
    },
  },
});

export const { setProblem, setTestcases } = problemSlice.actions;
export default problemSlice.reducer;
