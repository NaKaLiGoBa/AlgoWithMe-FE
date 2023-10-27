import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import IDETemplate from '../../UI/templates/IDETemplate';
import getProblem from '../../../utils/problemApi';
import constantProblem from './constant';

function ProblemPage() {
  const { problemId } = useParams();
  const [problem, setProblem] = useState(constantProblem);
  if (!problem) {
    return <div>Loading...</div>;
  }
  useEffect(() => {
    getProblem(`http://127.0.0.1:8080/api/v1/problems/${problemId}`)
      .then((response) => response.data)
      .then((data) => setProblem(data));
  }, [problemId]);

  return <IDETemplate problem={problem} />;
}

export default ProblemPage;
