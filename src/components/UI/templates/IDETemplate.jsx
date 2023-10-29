import React from 'react';
import ProblemPanel from '../molecules/ProblemPanel';
import Editor from '../molecules/Editor';
import OutputPanel from '../molecules/OutputPanel';

const index = ({
  problem,
  handleClickRunButton,
  setRunRequest,
  handleClickSubmitButton,
}) => (
  <main className="flex flex-row bg-[#E7E7E7] h-screen">
    <ProblemPanel
      number={problem.number}
      title={problem.title}
      difficulty={problem.difficulty}
      status={problem.status}
      acceptance={problem.acceptance}
      description={problem.description}
      tags={problem.tags}
    />
    <div className="grow">
      <Editor
        defaultCodes={problem.defaultCodes}
        problemNumber={problem.number}
        setRunRequest={setRunRequest}
      />
      <OutputPanel
        testcases={problem.testcases}
        handleClickRunButton={handleClickRunButton}
        handleClickSubmitButton={handleClickSubmitButton}
      />
    </div>
  </main>
);

export default index;