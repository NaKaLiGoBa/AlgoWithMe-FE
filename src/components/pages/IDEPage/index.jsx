import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setProblem } from '../../../store/problemSlice';
import IDETemplate from '../../UI/templates/IDETemplate';
import constantProblem from './constant';
import { resetTab } from '../../../store/tabState';

// API
import getProblemById from '../../../utils/api/v1/problem/getProblemById';

// problem loading
function ProblemPage() {
  const dispatch = useDispatch();
  const { problemId } = useParams();
  const activeTab = useSelector((state) => state.tabs.activeTab);

  useEffect(() => {
    dispatch(resetTab());
    getProblemById(problemId)
      .then((response) => response.data)
      .then((data) => {
        dispatch(setProblem(data));
      });
  }, [problemId, dispatch]);

  return <IDETemplate activeTab={activeTab} />;
}

export default ProblemPage;
