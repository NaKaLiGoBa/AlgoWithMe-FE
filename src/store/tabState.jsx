import { createSlice } from '@reduxjs/toolkit';

let nextTabId = 3; // 이미 1과 2는 사용되었다고 가정
export const tabsSlice = createSlice({
  name: 'tabs',
  initialState: {
    tabs: [
      { id: 1, type: 'Description', name: 'Description', content: '' },
      { id: 2, type: 'Solutions', name: 'Solutions', content: '' },
    ],
    activeTab: { id: 1, type: 'Description', name: 'Description', content: '' },
  },
  reducers: {
    addTab: (state, action) => {
      const newTab = {
        ...action.payload,
        id: nextTabId++, // 새 탭에 고유한 ID 할당
      };
      state.tabs.push(newTab);
    },
    removeTab: (state, action) => {
      state.tabs = state.tabs.filter((tab) => tab.id !== action.payload.id);
    },
    setActiveTab: (state, action) => {
      state.activeTab = action.payload;
    },
    reorderTabs: (state, action) => {
      const { fromIndex, toIndex } = action.payload;
      const result = Array.from(state.tabs);
      const [removed] = result.splice(fromIndex, 1);
      result.splice(toIndex, 0, removed);
      state.tabs = result;
    },
    updateTabContent: (state, action) => {
      const { id, content } = action.payload;
      const index = state.tabs.findIndex((tab) => tab.id === id);
      if (index !== -1) {
        state.tabs[index].content = content;
      }
    },
  },
});

export const {
  addTab,
  removeTab,
  setActiveTab,
  reorderTabs,
  updateTabContent,
} = tabsSlice.actions;

export default tabsSlice.reducer;
