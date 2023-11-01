import React from 'react';
import { useDispatch } from 'react-redux';
import { addTab } from '../../../../store/tabState';

const tests = {
  totalCount: 3,
  solutions: [
    {
      author: {
        avatar: 'h',
        nickname: 'user1',
      },
      solution: {
        id: 4,
        title: 'Solution 1',
      },
    },
    {
      author: {
        avatar: 'h',
        nickname: 'user2',
      },
      solution: {
        id: 5,
        title: 'Solution 2',
      },
    },
    {
      author: {
        avatar: 'h',
        nickname: 'user3',
      },
      solution: {
        id: 6,
        title: 'Solution3',
      },
    },
  ],
  _link: {
    nextCursor: 3,
  },
};
export default function index() {
  const dispatch = useDispatch();

  const handleSolutionClick = (solution) => {
    dispatch(addTab({ id: solution.id, type: 'Post', name: solution.title }));
  };
  return (
    <div className="h-screen">
      <div className="w-full border ">+풀이 공유</div>
      {tests.solutions.map((test) => (
        <div key={test.solution.id}>
          <div>{test.author.avatar} </div>
          <button
            type="button"
            onClick={() => handleSolutionClick(test.solution)}
          >
            <h2>{test.solution.title}</h2>
            <p>Author: {test.author.nickname}</p>
            <img
              src={test.author.avatar}
              alt={`${test.author.nickname}'s avatar`}
            />
          </button>
        </div>
      ))}
    </div>
  );
}
