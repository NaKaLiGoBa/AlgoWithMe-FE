import React from 'react';
import ProblemPanel from '../molecules/ProblemPanel';
import Editor from '../molecules/Editor';
import OutputPanel from '../molecules/OutputPanel';
import Header from '../molecules/Navigation/Header';
import ProblemTab from '../molecules/ProblemTab';
import Soulutions from '../molecules/Solutions';

const index = ({
  problem,
  handleClickRunButton,
  setRunRequest,
  handleClickSubmitButton,
  activeTab,
}) => (
  <div>
    <Header />
    <main className="flex flex-row bg-[#E7E7E7] h-full">
      <div className="w-[40%] bg-white rounded-xl m-2">
        <ProblemTab />
        <hr />
        {activeTab.type === 'Description' && (
          <ProblemPanel
            number={problem.number}
            title={problem.title}
            difficulty={problem.difficulty}
            status={problem.status}
            acceptance={problem.acceptance}
            description={problem.description}
            tags={problem.tags}
          />
        )}
        {activeTab.type === 'Solutions' && <Soulutions />}
      </div>
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
  </div>
);

export default index;
