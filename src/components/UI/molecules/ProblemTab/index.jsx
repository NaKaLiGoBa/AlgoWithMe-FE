import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeTab, setActiveTab } from '../../../../store/tabState';
import '../../atoms/Tab/styles.css';

export default function index() {
  const dispatch = useDispatch();
  const tabs = useSelector((state) => state.tabs.tabs);
  const activeTab = useSelector((state) => state.tabs.activeTab);
  const SolutionsTabName = (tab, totalCount) => {
    if (tab.type !== 'Solutions') {
      return tab.name;
    }
    return totalCount == null ? tab.name : `${tab.name} (${totalCount})`;
  };
  const totalCount = useSelector((state) => state.solutions.totalCount);
  const handleTabClick = (tab) => {
    dispatch(setActiveTab(tab));
  };

  const handleRemoveClick = (event, tab, i) => {
    event.stopPropagation();
    dispatch(removeTab(i));
  };

  return (
    <div>
      <ul className="flex overflow-auto customTab-scrollbar">
        {tabs.map((tab, i) => (
          <li
            key={tab.id}
            className={`flex justify-between py-1  border border-solid border-gray-200  ${
              activeTab.id === tab.id
                ? 'bg-blue-500 text-white'
                : 'bg-white text-black'
            } ${tab.type === 'Post' ? 'pl-4 pr-2  w-[150px]' : 'px-4'}`}
            onClick={() => handleTabClick(tab)}
          >
            <span className="truncate">
              {SolutionsTabName(tab, totalCount)}
            </span>
            {tab.type === 'Post' && (
              <div
                className="ml-2  "
                onClick={(event) => handleRemoveClick(event, tab, i)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-4 h-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </div>
            )}
          </li>
        ))}
      </ul>

      {/* {tabs.map((tab) => (
        <button
          type="button"
          key={tab.id}
          className={`py-2 px-4  ${
            activeTab.id === tab.id
              ? 'bg-blue-500 text-white'
              : 'bg-white text-black'
          }`}
          onClick={() => handleTabClick(tab)}
        >
          {tab.name}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      ))} */}
    </div>
  );
}
