import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import IDETemplate from '../../UI/templates/IDETemplate';
import constantProblem from './constant';

// API
import runTestCode from '../../../utils/runTestCodeApi';
import getProblem from '../../../utils/problemApi';
import postSubmit from '../../../utils/submitCodeApi';

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
      .then((data) => setProblem((prev) => ({ ...prev, testcases: data })));
  };

  // submit code button
  const handleClickSubmitButton = () => {
    postSubmit(`/api/v1/problems/${problem.number}/code/submit`, runRequest)
      .then((response) => response.data)
      .then((data) => alert(`정답인가요? ${data.isAnswer}`));
  };

  return (
    <IDETemplate
      problem={problem}
      setRunRequest={setRunRequest}
      handleClickRunButton={handleClickRunButton}
      handleClickSubmitButton={handleClickSubmitButton}
    />
  );
}

export default ProblemPage;
