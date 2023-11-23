import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useParams, useOutletContext } from 'react-router-dom';
import { addTab, setActiveTab } from '../../../../store/tabState';
import { setSolutionsData } from '../../../../store/SolutionsSlice';
import ListItem from '../ListItem';
import Link from '../../atoms/Text/Link';
import getSolutions from '../../../../utils/api/v1/solution/getSolutions';
import '../../atoms/Tab/styles.css';
import Spinner from '../../atoms/Spinner/index';

export default function index() {
  const dispatch = useDispatch();
  const { setTabs, tabs } = useOutletContext();
  const solutions = useSelector((state) => state.solutions.solutions);
  const [nextCursor, setNextCursor] = useState(-100);
  const [hasMore, setHasMore] = useState(true);
  const { problemId } = useParams();

  useEffect(() => {
    if (solutions.length > 0) {
      return;
    }

    const params = { cursor: nextCursor, size: 7 };
    getSolutions(problemId, params)
      .then((response) => response.data)
      .then((data) => {
        dispatch(setSolutionsData(data));
        setNextCursor(data._link.nextCursor);
      });
  }, [problemId, dispatch]);

  const handleSolutionClick = (solution) => {
    const isExist = tabs.some((tab) => tab.id === solution.id.toString());
    if (!isExist) {
      const newTab = {
        key: `${solution.id}`,
        id: `${solution.id.toString()}`,
        name: `${solution.title}`,
        path: `/problems/${problemId}/solutions/${solution.id}`,
        deletable: true,
      };
      setTabs((prev) => [...prev, newTab]);
    }
  };

  const fetchMoreData = async () => {
    if (!hasMore) return;
    setTimeout(async () => {
      const params = { cursor: nextCursor, size: 2 };
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

  return (
    <div className="h-[99%] px-4 py-4 ">
      <Link
        to="edit"
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
          loader={<Spinner />}
          scrollableTarget="scrollableDiv"
        >
          {solutions.map((solution) => (
            <Link
              to={`/problems/${problemId}/solutions/${solution.solution.id}`}
            >
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
            </Link>
          ))}
        </InfiniteScroll>
      </div>
    </div>
  );
}
