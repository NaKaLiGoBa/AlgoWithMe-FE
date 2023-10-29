import React, { useEffect, useState } from 'react';
import Button from '../../atoms/Input/Button';

const index = ({
  testcases,
  handleClickRunButton,
  handleClickSubmitButton,
}) => {
  const [hasRun, setHasRun] = useState(false);
  useEffect(() => {
    setHasRun('isAnswer' in testcases[0]);
  }, testcases);

  return (
    <div className="p-2 m-2 bg-white rounded-xl h-[250px] flex flex-col justify-between">
      <div className="h-[200px] overflow-y-auto mb-2">
        {testcases.map((testcase) => (
          <div
            className={`bg-gray-200 p-1 m-1 border-2 ${
              hasRun && testcase.isAnswer ? 'border-green-500' : ''
            }`}
          >
            <h2>
              {hasRun && testcase.isAnswer ? '✅' : ''}case{' '}
              {testcase.number + 1}
            </h2>
            <h3>Inputs</h3>
            {testcase.inputs.map((caseInput) => (
              <p className="m-2">{`${caseInput.name} = ${caseInput.value}`}</p>
            ))}
            <h3>Expected</h3>
            <p className="m-2">{testcase.expected}</p>
          </div>
        ))}
      </div>
      <div className="flex flex-row justify-between items-center">
        <h2>Console</h2>
        <div className="flex flex-row justify-end gap-4">
          <Button
            className="rounded-xl px-4 py-2"
            onClick={handleClickRunButton}
          >
            실행
          </Button>
          <Button
            className="rounded-xl px-4 py-2 bg-green-500 hover:bg-green-600"
            onClick={handleClickSubmitButton}
          >
            제출
          </Button>
        </div>
      </div>
    </div>
  );
};

export default index;
