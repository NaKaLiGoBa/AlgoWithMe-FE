import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useParams, useOutletContext } from 'react-router-dom';
import ListItem from '../ListItem';
import Link from '../../atoms/Text/Link';
import getSolutions from '../../../../utils/api/v1/solution/getSolutions';
import '../../atoms/Tab/styles.css';
import Spinner from '../../atoms/Spinner/index';

export default function index() {
  const dispatch = useDispatch();
  const { setTabs, tabs, solutions, setSolutions } = useOutletContext();
  const { problemId } = useParams();

  useEffect(() => {
    if (solutions.solutions.length > 0) {
      return;
    }

    const params = { cursor: solutions._link.nextCursor, size: 7 };
    getSolutions(problemId, params)
      .then((response) => response.data)
      .then((data) => {
        setSolutions((prev) => ({
          ...prev,
          solutions: [...data.solutions],
          totalCount: data.totalCount,
          _link: data._link,
        }));
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
    if (!solutions.hasMore) return;
    setTimeout(async () => {
      const params = { cursor: solutions._link.nextCursor, size: 5 };
      const response = await getSolutions(problemId, params);
      if (response.success) {
        setSolutions((prev) => ({
          ...prev,
          solutions: [...prev.solutions, ...response.data.solutions],
          totalCount: response.totalCount,
          _link: response.data._link,
          hasMore: response.data._link.nextCursor !== -1,
        }));
      } else {
        setSolutions((prev) => ({
          ...prev,
          hasMore: false,
        }));
      }
    }, 1000);
  };

  return (
    <div className="h-[99%] px-4 py-4 ">

      <div
        id="scrollableDiv"
        className="overflow-auto h-[calc(100%-30px)] customTab-scrollbar"
      >
        <InfiniteScroll
          dataLength={solutions.solutions.length}
          next={fetchMoreData}
          hasMore={solutions.hasMore}
          loader={solutions.solutions.length > 0 && <Spinner />}
          scrollableTarget="scrollableDiv"
        >
          {solutions.solutions.map((solution) => (
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
