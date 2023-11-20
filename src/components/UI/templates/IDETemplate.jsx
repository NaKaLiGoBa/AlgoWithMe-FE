import React from 'react';
import ProblemPanel from '../molecules/ProblemPanel';
import Editor from '../molecules/Editor';
import OutputPanel from '../molecules/OutputPanel';
import Header from '../molecules/Navigation/Header';
import ProblemTab from '../molecules/ProblemTab';
import Solutions from '../molecules/Solutions';
import SolutionTest from '../molecules/SolutionTest';
import AIchat from '../molecules/AICoaching/index';
import Button from '../atoms/Input/Button';

const index = ({ activeTab, handleChatToggle, showChat }) => (
  <div className="h-screen">
    <Header />
    <main className="flex flex-row bg-[#E7E7E7] h-[calc(100%-70px)]">
      <div className="w-[40%] bg-white rounded-xl m-2 h-[100%]">
        <ProblemTab />
        <hr />
        {activeTab.type === 'Description' && <ProblemPanel />}
        {activeTab.type === 'Solutions' && <Solutions />}
        {activeTab.type === 'Post' && <SolutionTest />}
      </div>
      <div className="grow h-[100%]">
        <Editor />
        <OutputPanel />
      </div>
      <div className="fixed bottom-4 right-5">
        {showChat ? (
          <AIchat handleChatToggle={handleChatToggle} />
        ) : (
          <Button
            className="bg-[#6D4BEB] px-4 py-6 text-lg "
            onClick={handleChatToggle}
          >
            AI
          </Button>
        )}
      </div>
    </main>
  </div>
);

export default index;
