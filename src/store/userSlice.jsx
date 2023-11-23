// features/userSlice.js
import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    id: '',
    avatar: '',
    nickname: '',
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;  
    },
    setNickname: (state, action) => {
      state.nickname = action.payload
      console.log('set user', action.payload)
    }
  },
});

export const { setUser, setNickname } = userSlice.actions;

export const selectUser = (state) => state.user;

export default userSlice.reducer;
