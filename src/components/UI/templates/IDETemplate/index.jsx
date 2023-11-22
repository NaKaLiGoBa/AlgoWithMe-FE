import React, { useState, useEffect } from 'react';
import {
  Outlet,
  useLocation,
  useParams,
  Navigate,
  Link,
} from 'react-router-dom';
import Editor from '../../molecules/Editor';
import OutputPanel from '../../molecules/OutputPanel';
import Header from '../../molecules/Navigation/Header';
import AIchat from '../../molecules/AICoaching/index';
import Button from '../../atoms/Input/Button';

function Tab({ name, path, active }) {
  return (
    <div className={`${active ? 'text-black bg-white' : 'text-gray-400'} hover:bg-white px-4 py-2`}>
      <Link to={path}>{name}</Link>
    </div>
  );
}

function Tabs({ tabs }) {
  return (
    <div className="h-[40px] flex flex-row items-center bg-gray-100 rounded-xl">
      {tabs.map((tab) => (
        <Tab key={tab.id} name={tab.name} path={tab.path} active={tab.active} />
      ))}
    </div>
  );
}

const index = ({ handleChatToggle, showChat }) => {
  const location = useLocation();
  const { problemId } = useParams();
  const initialTabs = [
    {
      id: 'description',
      name: '문제 설명',
      path: `/problems/${problemId}/description`,
    },
    {
      id: 'solutions',
      name: '솔루션',
      path: `/problems/${problemId}/solutions`,
    },
  ];
  const [tabs, setTabs] = useState(
    initialTabs.map((tab) => ({
      ...tab,
      active: location.pathname === tab.path,
    })),
  );

  useEffect(() => {
    setTabs((tabs) =>
      tabs.map((tab) => ({
        ...tab,
        active: location.pathname === tab.path,
      })),
    );
  }, [location.pathname]);

  if (location.pathname === `/problems/${problemId}`) {
    return <Navigate to={`/problems/${problemId}/description`} replace />;
  }

  return (
    <div className="h-screen">
      <Header className="bg-transparent" />
      <main className="flex flex-row bg-[#E7E7E7] h-[calc(100%-60px)] gap-1">
        <div className="w-[40%] bg-white rounded-xl h-[100%]">
          <Tabs tabs={tabs} />
          <div className="h-[calc(100%-40px)]">
            <Outlet />
          </div>
        </div>
        <div className="grow bg-white rounded-xl  h-[100%]">
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
};

export default index;
