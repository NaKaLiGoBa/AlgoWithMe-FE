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

export default function index() {
  const dispatch = useDispatch();
  const handleTabClick = (tab) => {
    dispatch(setActiveTab(tab));
  };
  const tabs = useSelector((state) => state.tabs.tabs);
  const activeTab = useSelector((state) => state.tabs.activeTab);
  console.log('e', tabs);

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

  const handleCloseTab = (tabIdToClose) => {
    dispatch(removeTab({ id: tabIdToClose }));
    if (activeTab.id === tabIdToClose && tabs.length > 1) {
      const newActiveTab =
        tabs[tabs.findIndex((tab) => tab.id !== tabIdToClose) - 1] || tabs[0];
      dispatch(setActiveTab(newActiveTab));
    }
  };

  // 드래그 앤 드롭
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

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="tabs">
        {(provided) => (
          <ul
            className="flex"
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
                    className={`py-2 px-4 ${
                      activeTab.id === tab.id
                        ? 'bg-blue-500 text-white'
                        : 'bg-white text-black'
                    }`}
                    onClick={() => handleTabClick(tab)}
                  >
                    {tab.name}
                    <button
                      onClick={(e) => {
                        e.stopPropagation(); // 버블링을 막기 위함
                        handleCloseTab(tab.id);
                      }}
                      className="ml-1"
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
