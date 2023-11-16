import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  tabs: [
    {
      id: 0,
      type: 'Description',
      name: 'Description',
      content: '',
      data: {
        solution: {
          id: '',
          title: '',
        },
      },
      fixed: true,
    },
    {
      id: 1,
      type: 'Solutions',
      name: 'Solutions',
      content: '',
      data: {
        solution: {
          id: '',
          title: '',
        },
      },
      fixed: true,
    },
  ],
  activeTab: {
    id: 0,
    type: 'Description',
    name: 'Description',
    content: '',
    data: {
      solution: {
        id: '',
        title: '',
      },
    },
  },
};

let nextTabId = 2; // 이미 1과 2는 사용되었다고 가정
export const tabsSlice = createSlice({
  name: 'tabs',
  initialState,
  reducers: {
    addTab: (state, action) => {
      console.log(action.payload);
      const newTab = {
        ...action.payload,
        id: nextTabId++, // 새 탭에 고유한 ID 할당
      };
      console.log(newTab);
      state.tabs.push(newTab);
    },
    removeTab: (state, action) => {
      const idToRemove = action.payload.id; // payload should be the id of the tab to remove
      const index = state.tabs.findIndex((tab) => tab.id === idToRemove);
      if (index !== -1) {
        state.tabs.splice(index, 1);
      }
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
    resetTab: () => initialState,
  },
});

export const {
  addTab,
  removeTab,
  setActiveTab,
  reorderTabs,
  updateTabContent,
  resetTab,
} = tabsSlice.actions;

export default tabsSlice.reducer;
