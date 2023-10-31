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
        title: 'Solution 1 for Problem X',
      },
    },
    {
      author: {
        avatar: 'h',
        nickname: 'user2',
      },
      solution: {
        id: 5,
        title: 'Solution 2 for Problem X',
      },
    },
    {
      author: {
        avatar: 'h',
        nickname: 'user3',
      },
      solution: {
        id: 6,
        title: 'Solution 3 for Problem X',
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
      {tests.solutions.map((test) => (
        <div key={test.solution.id}>
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
