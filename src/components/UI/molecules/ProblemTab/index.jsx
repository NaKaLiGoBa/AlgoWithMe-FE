import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import {
  addTab,
  setActiveTab,
  reorderTabs,
  updateTabContent,
} from '../../../../store/tabState';

export default function index() {
  const dispatch = useDispatch();
  const handleTabClick = (tab) => {
    dispatch(setActiveTab(tab));
  };
  const tabs = useSelector((state) => state.tabs.tabs);
  const activeTab = useSelector((state) => state.tabs.activeTab);
  console.log('e', tabs);

  const handleSolutionClick = (solution) => {
    const existingTab = tabs.find((tab) => tab.id === solution.id);
    if (existingTab) {
      dispatch(setActiveTab(existingTab));
    } else {
      const newTab = { id: solution.id, type: 'Post', name: solution.title };
      dispatch(addTab(newTab));
      dispatch(setActiveTab(newTab));
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
