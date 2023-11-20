import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import {
  addTab,
  removeTab,
  setActiveTab,
  reorderTabs,
  updateTabContent,
} from '../../../../store/tabState';
import { fetchSolution } from '../../../../utils/fetchSolution';
import '../../atoms/Tab/styles.css';

export default function index() {
  const dispatch = useDispatch();
  const tabs = useSelector((state) => state.tabs.tabs);
  const activeTab = useSelector((state) => state.tabs.activeTab);
  const totalCount = useSelector((state) => state.solutions.totalCount);

  // 탭 이름을 결정하는 함수
  const SolutionsTabName = (tab, totalCount) => {
    if (tab.type !== 'Solutions') {
      return tab.name;
    }
    return totalCount == null ? tab.name : `${tab.name} (${totalCount})`;
  };

  // 탭 클릭 이벤트 핸들러
  const handleTabClick = (tab) => {
    dispatch(setActiveTab(tab));
  };

  // 솔루션 클릭 이벤트 핸들러
  const handleSolutionClick = async (problemId, solutionId) => {
    try {
      const solutionData = await fetchSolution(problemId, solutionId);
      const existingTab = tabs.find((tab) => tab.id === solutionId);

      if (existingTab) {
        dispatch(setActiveTab(existingTab));
      } else {
        const newTab = {
          id: solutionId,
          type: 'Post',
          name: solutionData.solution.title,
          content: solutionData.solution.content,
        };
        dispatch(addTab(newTab));
        dispatch(setActiveTab(newTab));
        dispatch(
          updateTabContent({
            id: solutionId,
            content: solutionData.solution.content,
          }),
        );
      }
    } catch (error) {
      console.error('Error fetching solution:', error);
    }
  };

  // 탭 닫기 이벤트 핸들러
  const handleCloseTab = (event, tabIdToClose, tabIndex) => {
    event.stopPropagation(); // 이벤트 버블링 방지
    if (!tabs[tabIndex].fixed) {
      dispatch(removeTab({ id: tabIdToClose }));
      if (activeTab.id === tabIdToClose && tabs.length > 1) {
        const newActiveTabIndex = tabIndex === 0 ? 1 : tabIndex - 1;
        const newActiveTab = tabs[newActiveTabIndex];
        dispatch(setActiveTab(newActiveTab));
      }
    }
  };

  // 드래그 앤 드롭 이벤트 핸들러
  const onDragEnd = (result) => {
    const { destination, source } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    // tabs 배열 순서를 저장
    dispatch(
      reorderTabs({
        fromIndex: source.index,
        toIndex: destination.index,
      }),
    );
  };

  // JSX 반환
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="tabs">
        {(provided) => (
          <ul
            className="flex overflow-auto customTab-scrollbar"
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {tabs.map((tab, index) => (
              <Draggable
                key={tab.id}
                draggableId={String(tab.id)}
                index={index}
              >
                {(provided) => (
                  <li
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className={`flex justify-between items-center py-1 px-4 border border-solid border-gray-200 ${
                      activeTab.id === tab.id
                        ? 'bg-blue-500 text-white'
                        : 'bg-white text-black'
                    }`}
                    onClick={() => handleTabClick(tab)}
                  >
                    <span className="truncate">
                      {SolutionsTabName(tab, totalCount)}
                    </span>
                    <button
                      onClick={(event) => handleCloseTab(event, tab.id, index)}
                      className={`ml-2 ${tab.fixed ? 'hidden' : ''}`}
                    >
                      &times;
                    </button>
                  </li>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </ul>
        )}
      </Droppable>
    </DragDropContext>
  );
}
