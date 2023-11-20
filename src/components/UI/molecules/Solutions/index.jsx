import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useParams } from 'react-router-dom';
import { addTab, setActiveTab } from '../../../../store/tabState';
import { setSolutionsData } from '../../../../store/SolutionsSlice';
import ListItem from '../ListItem';
import Link from '../../atoms/Text/Link';
import getSolutions from '../../../../utils/api/v1/solution/getSolutions';

export default function index() {
  const dispatch = useDispatch();
  const solutions = useSelector((state) => state.solutions.solutions);
  const [nextCursor, setNextCursor] = useState(-100);
  const tabs = useSelector((state) => state.tabs.tabs);
  const [hasMore, setHasMore] = useState(true);
  const { problemId } = useParams();

  useEffect(() => {
    getSolutions(problemId)
      .then((response) => response.data)
      .then((data) => {
        dispatch(setSolutionsData(data));
        setNextCursor(data._link.nextCursor);
      });
  }, [dispatch]);

  const handleSolutionClick = (solution) => {
    const TabExisting = tabs.some(
      (tab) => tab.data.solution.id === solution.id,
    );
    if (!TabExisting) {
      const newTab = { type: 'Post', name: solution.title, data: { solution } };
      dispatch(addTab(newTab));
      dispatch(setActiveTab(newTab));
    }
  };

  const fetchMoreData = async () => {
    if (!hasMore) return;
    setTimeout(async () => {
      try {
        const { data, success } = await getSolutions(problemId, nextCursor, 2);
        if (success) {
          dispatch(
            setSolutionsData({
              totalCount: data.totalCount,
              solutions: [...solutions, ...data.solutions],
            }),
          );
          setNextCursor(data._link.nextCursor);
          setHasMore(data._link.nextCursor !== -1);
        } else {
          setHasMore(false);
        }
      } catch (error) {
        console.error('Error fetching more data:', error);
        setHasMore(false);
      }
    }, 1000);
  };
  const SolutionsUrl = `${window.location.href}/solutions/edit`;

  return (
    <div className="h-[95%] px-4 py-4">
      <Link
        to={SolutionsUrl}
        className="w-full flex justify-center bg-[#63B758] text-white py-2 mb-5 rounded-sm"
      >
        + 풀이 공유
      </Link>
      <InfiniteScroll
        dataLength={solutions.length}
        next={fetchMoreData}
        hasMore={hasMore}
        loader={
          <div className="flex space-x-7 justify-center">
            <div className="w-5 h-5 bg-gray-300 rounded-full" />
            <div className="w-5 h-5 bg-gray-300 rounded-full" />
            <div className="w-5 h-5 bg-gray-300 rounded-full" />
          </div>
        }
      >
        {solutions.map((solution) => (
          <ListItem
            key={solution.solution.id}
            avatar={solution.author.avatar}
            nickname={solution.author.nickname}
            title={solution.solution.title}
            likeCount={solution.solution.likeCount}
            viewCount={solution.solution.viewCount}
            commentCount={solution.solution.commentCount}
            onClick={() => handleSolutionClick(solution.solution)}
          />
        ))}
      </InfiniteScroll>
    </div>
  );
}
