import React, { useState, useEffect } from 'react';
import {
  Outlet,
  useLocation,
  useParams,
  Navigate,
  Link,
  useNavigate,
} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Editor from '../../molecules/Editor';
import OutputPanel from '../../molecules/OutputPanel';
import Header from '../../molecules/Navigation/Header';
import AIchat from '../../molecules/AICoaching/index';
import Button from '../../atoms/Input/Button';
import Close from '../../atoms/Icon/Close';
import { setSolutionsData } from '../../../../store/SolutionsSlice';

function DeleteButton({ setTabs, id }) {
  const navigate = useNavigate();
  function handleClick() {
    setTabs((prevTabs) => {
      const newTabs = prevTabs.filter((tab) => tab.id !== id);
      const deleteIndex = prevTabs.findIndex((tab) => tab.id === id);
      const newActiveIndex = deleteIndex === 0 ? 1 : deleteIndex - 1;
      if (newTabs.length > 0) {
        navigate(newTabs[newActiveIndex].path);
      }
      return newTabs;
    });
  }

  return (
    <button
      type="button"
      className="bg-transparent text-black"
      onClick={handleClick}
    >
      <Close className="w-[12px] hover:text-rose-600" />
    </button>
  );
}

function Tab({ id, name, path, active, deletable, setTabs }) {
  return (
    <div
      className={`${
        active ? 'text-black bg-white' : 'text-gray-400'
      } hover:bg-white px-4 py-2 flex gap-1`}
    >
      <Link to={path}>
        <span className="max-w-[100px] truncate">{name}</span>
      </Link>
      {deletable && <DeleteButton setTabs={setTabs} id={id} />}
    </div>
  );
}

function Tabs({ tabs, setTabs }) {
  return (
    <div className="flex flex-nowrap overflow-x-auto items-center bg-gray-100 rounded-xl">
      {tabs.map((tab) => (
        <Tab
          key={tab.id}
          name={tab.name}
          path={tab.path}
          active={tab.active}
          deletable={tab.deletable}
          id={tab.id}
          setTabs={setTabs}
        />
      ))}
    </div>
  );
}

const index = ({ handleChatToggle, showChat }) => {
  const location = useLocation();
  const { problemId } = useParams();
  const dispatch = useDispatch();
  const [solutions, setSolutions] = useState({
    totalCount: null,
    solutions: [],
    hasMore: true,
    _link: {
      nextCursor: -100
    }
  });
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
    dispatch(setSolutionsData({ solutions: [] }));
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
        <div className="w-[40%] bg-white rounded-xl h-[100% flex-row">
          <div className="overflow-x-auto ">
            <Tabs tabs={tabs} setTabs={setTabs} />
          </div>
          <div className="h-[calc(100%-45px)]">
            <Outlet
              context={{
                setTabs,
                tabs,
                solutions,
                setSolutions,
              }}
            />
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
