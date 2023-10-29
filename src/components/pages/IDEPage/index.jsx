import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import IDETemplate from '../../UI/templates/IDETemplate';
import constantProblem from './constant';

// API
import runTestCode from '../../../utils/runTestCodeApi';
import getProblem from '../../../utils/problemApi';

// problem loading
function ProblemPage() {
  const { problemId } = useParams();
  const [problem, setProblem] = useState(constantProblem);
  if (!problem) {
    return <div>Loading...</div>;
  }
  useEffect(() => {
    getProblem(`/api/v1/problems/${problemId}`)
      .then((response) => response.data)
      .then((data) => setProblem(data));
  }, [problemId]);

  // run test button
  const [runRequest, setRunRequest] = useState('');
  const handleClickRunButton = () => {
    runTestCode(`/api/v1/problems/${problem.number}/code/test`, runRequest)
      .then((response) => response.data)
      .then((data) =>
        setProblem((prev) => ({ ...prev, testcases: data})),
      );
  };

  return (
    <IDETemplate
      problem={problem}
      setRunRequest={setRunRequest}
      handleClickRunButton={handleClickRunButton}
    />
  );
}

export default ProblemPage;
