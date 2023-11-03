import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTab } from '../../../../store/tabState';
import { setSolutionsData } from '../../../../store/SolutionsSlice';
import SolutionsData from '../../../../../public/api/SolutionsData.json';
import ListItem from '../ListItem';

export default function index() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setSolutionsData(SolutionsData));
  }, [dispatch]);

  const tests = useSelector((state) => state.solutions.solutions);
  const tabs = useSelector((state) => state.tabs.tabs);

  const handleSolutionClick = (solution) => {
    const TabExisting = tabs.some((tab) => tab.id === solution.id);
    if (!TabExisting) {
      dispatch(addTab({ id: solution.id, type: 'Post', name: solution.title }));
    }
  };
  return (
    <div className=" px-4 py-4">
      <div className="w-full border flex ">+풀이 공유</div>
      {tests.map((test) => (
        <ListItem
          key={test.solution.id}
          avatar={test.author.avatar}
          nickname={test.author.nickname}
          title={test.solution.title}
          onClick={() => handleSolutionClick(test.solution)}
        />
      ))}
    </div>
  );
}
