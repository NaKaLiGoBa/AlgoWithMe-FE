import { createSlice } from '@reduxjs/toolkit';

export const tabsSlice = createSlice({
  name: 'tabs',
  initialState: {
    tabs: [
      { id: 1, type: 'Description', name: 'Description' },
      { id: 2, type: 'Solutions', name: 'Solutions' },
    ],
    activeTab: { id: 1, type: 'Description', name: 'Description' },
  },
  reducers: {
    addTab: (state, action) => {
      state.tabs.push(action.payload);
    },
    removeTab: (state, action) => {
      const index = action.payload;
      state.tabs.splice(index, 1);
    },
    setActiveTab: (state, action) => {
      state.activeTab = action.payload;
    },
  },
});

export const { addTab, removeTab, setActiveTab } = tabsSlice.actions;

export default tabsSlice.reducer;
