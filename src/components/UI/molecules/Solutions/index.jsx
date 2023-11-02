import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTab } from '../../../../store/tabState';
import { setSolutionsData } from '../../../../store/SolutionsSlice';
import SolutionsData from '../../../../../public/api/SolutionsData.json';

export default function index() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setSolutionsData(SolutionsData));
  }, [dispatch]);

  const tests = useSelector((state) => state.solutions.solutions);
  const tabs = useSelector((state) => state.tabs.tabs);

  const handleSolutionClick = (solution) => {
    const TabExisting = tabs.some((tab) => tab.id === solution.id);
    console.log('TabExisiting', TabExisting);
    if (!TabExisting) {
      dispatch(addTab({ id: solution.id, type: 'Post', name: solution.title }));
    }
  };
  return (
    <div className="h-screen px-4 py-4">
      <div className="w-full border flex ">+풀이 공유</div>
      {tests.map((test) => (
        <div key={test.solution.id}>
          <div>{test.author.avatar} </div>
          <span>{test.author.nickname}</span>
          <button
            type="button"
            onClick={() => handleSolutionClick(test.solution)}
          >
            <h2>{test.solution.title}</h2>
          </button>
        </div>
      ))}
    </div>
  );
}
