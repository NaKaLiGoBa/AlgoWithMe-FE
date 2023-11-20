import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setProblem } from '../../../store/problemSlice';
import IDETemplate from '../../UI/templates/IDETemplate';
import { resetTab } from '../../../store/tabState';
import { toggleChat } from '../../../store/AIChatSlice';
import getProblemById from '../../../utils/api/v1/problem/getProblemById';

function ProblemPage() {
  const dispatch = useDispatch();
  const { problemId } = useParams();
  const activeTab = useSelector((state) => state.tabs.activeTab);
  const showChat = useSelector((state) => state.chat.isVisible);
  const [isDataLoaded, setIsDataLoaded] = useState(false); // Local state to track data loading

  useEffect(() => {
    dispatch(resetTab());
    getProblemById(problemId)
      .then((response) => response.data)
      .then((data) => {
        dispatch(setProblem(data));
        setIsDataLoaded(true); // Set to true when data is loaded
      });
  }, [problemId, dispatch]);

  const handleChatToggle = () => {
    dispatch(toggleChat());
  };

  // Render IDETemplate only if data is loaded
  if (!isDataLoaded) {
    return <div>Loading...</div>; // Or any other loading indicator
  }

  return (
    <IDETemplate
      activeTab={activeTab}
      handleChatToggle={handleChatToggle}
      showChat={showChat}
    />
  );
}

export default ProblemPage;
