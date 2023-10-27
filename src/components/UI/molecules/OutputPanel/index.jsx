import React from 'react';
import Button from '../../atoms/Input/Button';

const index = ({ testcases }) => (
  <div className="p-2 m-2 bg-white rounded-xl h-[200px] overflow-y-auto">
    <div>
      {testcases.map((testcase) => (
        <div className="bg-gray-200 p-1 m-1">
          <h2>case {testcase.number + 1}</h2>
          <h3>Inputs</h3>
          {testcase.inputs.map((caseInput) => (
            <p>{`${caseInput.name} = ${caseInput.value}`}</p>
          ))}
          <h3>Expected</h3>
          <p>{testcase.expected}</p>
        </div>
      ))}
    </div>
    <div className="flex flex-row justify-between items-center">
      <h2>Console</h2>
      <div className="flex flex-row justify-end gap-4">
        <Button className='rounded-xl px-4 py-2'>실행</Button>
        <Button className='rounded-xl px-4 py-2 bg-green-500 hover:bg-green-600'>제출</Button>
      </div>
    </div>
  </div>
);

export default index;
