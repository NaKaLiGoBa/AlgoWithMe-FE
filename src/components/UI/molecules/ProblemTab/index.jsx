import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setActiveTab } from '../../../../store/tabState';

export default function index() {
  const dispatch = useDispatch();
  const handleTabClick = (tab) => {
    dispatch(setActiveTab(tab));
  };
  const tabs = useSelector((state) => state.tabs.tabs);
  const activeTab = useSelector((state) => state.tabs.activeTab);

  return (
    <div className="flex space-x-4">
      {tabs.map((tab) => (
        <button
          type="button"
          key={tab.id}
          className={`py-2 px-4 ${
            activeTab.id === tab.id
              ? 'bg-blue-500 text-white'
              : 'bg-white text-black'
          }`}
          onClick={() => handleTabClick(tab)}
        >
          {tab.type}
        </button>
      ))}
    </div>
  );
}
