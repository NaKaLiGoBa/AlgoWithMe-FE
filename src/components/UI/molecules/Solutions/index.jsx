import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useParams } from 'react-router-dom';
import { addTab, setActiveTab } from '../../../../store/tabState';
import { setSolutionsData } from '../../../../store/SolutionsSlice';
import ListItem from '../ListItem';
import Link from '../../atoms/Text/Link';
import getSolutions from '../../../../utils/api/v1/solution/getSolutions';
import '../../atoms/Tab/styles.css';
import Spinner from '../../atoms/Spinner/index';

export default function index() {
  const dispatch = useDispatch();
  const solutions = useSelector((state) => state.solutions.solutions);
  const [nextCursor, setNextCursor] = useState(-100);
  const tabs = useSelector((state) => state.tabs.tabs);
  const [hasMore, setHasMore] = useState(true);
  const { problemId } = useParams();

  useEffect(() => {
    const params = { cursor: nextCursor, size: 7 };
    getSolutions(problemId, params)
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
      const params = { cursor: nextCursor, size: 2 };
      console.log('Calling fetchMoreData with params:', params);
      const response = await getSolutions(problemId, params);
      if (response.success) {
        dispatch(
          setSolutionsData({
            totalCount: response.data.totalCount,
            solutions: [...solutions, ...response.data.solutions],
          }),
        );
        setNextCursor(response.data._link.nextCursor);
        setHasMore(response.data._link.nextCursor !== -1);
      } else {
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
      <div
        id="scrollableDiv"
        className="overflow-auto h-[calc(100%-30px)] customTab-scrollbar"
      >
        <InfiniteScroll
          dataLength={solutions.length}
          next={fetchMoreData}
          hasMore={hasMore}
          loader={solutions.length > 0 && <Spinner />}
          scrollableTarget="scrollableDiv"
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
    </div>
  );
}
