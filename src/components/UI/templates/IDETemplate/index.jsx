import React from 'react';
import ProblemPanel from '../../molecules/ProblemPanel';
import Editor from '../../molecules/Editor';
import OutputPanel from '../../molecules/OutputPanel';
import Header from '../../molecules/Navigation/Header';
import ProblemTab from '../../molecules/ProblemTab';
import Solutions from '../../molecules/Solutions';
import SolutionTest from '../../molecules/SolutionTest';

const index = ({ activeTab }) => (
  <div>
    <Header />
    <main className="flex flex-row bg-[#E7E7E7] h-[calc(100%-50px)]">
      <div className="w-[40%] bg-white rounded-xl m-2">
        <ProblemTab />
        <hr />
        {activeTab.type === 'Description' && <ProblemPanel />}
        {activeTab.type === 'Solutions' && <Solutions />}
        {activeTab.type === 'Post' && <SolutionTest />}
      </div>
      <div className="grow">
        <Editor />
        <OutputPanel />
      </div>
    </main>
  </div>
);

export default index;
