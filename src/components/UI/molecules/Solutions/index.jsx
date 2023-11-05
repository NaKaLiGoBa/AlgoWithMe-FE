import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import InfiniteScroll from 'react-infinite-scroll-component';
import { addTab } from '../../../../store/tabState';
import { setSolutionsData } from '../../../../store/SolutionsSlice';
import SolutionsData from '../../../../../public/api/SolutionsData.json';
import ListItem from '../ListItem';
import Link from '../../atoms/Text/Link';

export default function index() {
  const dispatch = useDispatch();
  const solutions = useSelector((state) => state.solutions.solutions);
  const tabs = useSelector((state) => state.tabs.tabs);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    dispatch(setSolutionsData(SolutionsData));
  }, [dispatch]);

  const handleSolutionClick = (solution) => {
    const TabExisting = tabs.some((tab) => tab.id === solution.id);
    if (!TabExisting) {
      dispatch(addTab({ id: solution.id, type: 'Post', name: solution.title }));
    }
  };
  const fetchMoreData = () => {};
  const SolutionsUrl = `${window.location.href}/solutions`;

  return (
    <div className=" px-4 py-4">
      <Link
        to={SolutionsUrl}
        className="w-full border flex justify-center bg-[#63B758] text-white py-2 mb-5"
      >
        +풀이 공유
      </Link>
      <InfiniteScroll
        dataLength={solutions.length}
        next={fetchMoreData}
        hasMore={hasMore}
        loader={
          <div className="flex space-x-7 justify-center">
            <div className="w-5 h-5 bg-gray-300 rounded-full"></div>
            <div className="w-5 h-5 bg-gray-300 rounded-full"></div>
            <div className="w-5 h-5 bg-gray-300 rounded-full"></div>
          </div>
        }
      >
        {solutions.map((solution) => (
          <ListItem
            key={solution.solution.id}
            avatar={solution.author.avatar}
            nickname={solution.author.nickname}
            title={solution.solution.title}
            onClick={() => handleSolutionClick(solution.solution)}
          />
        ))}
      </InfiniteScroll>
    </div>
  );
}
