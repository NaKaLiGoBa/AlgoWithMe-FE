import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setProblem } from '../../../store/problemSlice';
import IDETemplate from '../../UI/templates/IDETemplate';
import { resetTab } from '../../../store/tabState';
import { toggleChat } from '../../../store/AIChatSlice';

// API
import getProblemById from '../../../utils/api/v1/problem/getProblemById';

// problem loading
function ProblemPage() {
  const dispatch = useDispatch();
  const { problemId } = useParams();
  const activeTab = useSelector((state) => state.tabs.activeTab);
  const showChat = useSelector((state) => state.chat.isVisible);

  useEffect(() => {
    dispatch(resetTab());
    getProblemById(problemId)
      .then((response) => response.data)
      .then((data) => {
        dispatch(setProblem(data));
      });
  }, [problemId, dispatch]);

  const handleChatToggle = () => {
    dispatch(toggleChat());
  };

  return (
    <IDETemplate
      activeTab={activeTab}
      handleChatToggle={handleChatToggle}
      showChat={showChat}
    />
  );
}

export default ProblemPage;
