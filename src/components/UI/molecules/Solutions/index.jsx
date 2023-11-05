import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import InfiniteScroll from 'react-infinite-scroll-component';
import { addTab } from '../../../../store/tabState';
import { setSolutionsData } from '../../../../store/SolutionsSlice';
// import SolutionsData from '../../../../../public/api/SolutionsData.json';
import ListItem from '../ListItem';
import Link from '../../atoms/Text/Link';
import page1Data from '../../../../../public/api/page1.json';
import page2Data from '../../../../../public/api/page2.json';
import page3Data from '../../../../../public/api/page3.json';

export default function index() {
  const dispatch = useDispatch();
  const solutions = useSelector((state) => state.solutions.solutions);
  const [nextCursor, setNextCursor] = useState(-100);
  const tabs = useSelector((state) => state.tabs.tabs);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    dispatch(setSolutionsData(page1Data));
    setNextCursor(page1Data['_link'].nextCursor);
  }, [dispatch]);

  const handleSolutionClick = (solution) => {
    const TabExisting = tabs.some((tab) => tab.id === solution.id);
    if (!TabExisting) {
      dispatch(addTab({ id: solution.id, type: 'Post', name: solution.title }));
    }
  };

  const fetchMoreData = () => {
    if (nextCursor === -1) {
      setHasMore(false);
      return;
    }

    setTimeout(() => {
      let newData;
      switch (nextCursor) {
        case 3:
          newData = page2Data;
          break;
        case 1:
          newData = page3Data;
          break;
        default:
          setHasMore(false);
          return;
      }

      if (newData && newData.solutions.length > 0) {
        dispatch(
          setSolutionsData({
            totalCount: newData.totalCount,
            solutions: [...solutions, ...newData.solutions],
          }),
        );
        setNextCursor(newData['_link'] ? newData['_link'].nextCursor : -1);
      } else {
        setHasMore(false);
      }
    }, 1000);
  };
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
          // <div>Loading...</div>
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
