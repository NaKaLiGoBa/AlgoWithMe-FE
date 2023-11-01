import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTab } from '../../../../store/tabState';

const tests = {
  totalCount: 5,
  solutions: [
    {
      author: {
        avatar: 'h',
        nickname: 'user1',
      },
      solution: {
        id: 4,
        title: 'Solution 1 for Problem ',
      },
    },
    {
      author: {
        avatar: 'h',
        nickname: 'user2',
      },
      solution: {
        id: 5,
        title: 'Solution 2 for Problem',
      },
    },
    {
      author: {
        avatar: 'h',
        nickname: 'user3',
      },
      solution: {
        id: 6,
        title: 'Solution3 for Problem',
      },
    },
    {
      author: {
        avatar: 'h',
        nickname: 'user4',
      },
      solution: {
        id: 7,
        title: 'Solution4 for Problem',
      },
    },
    {
      author: {
        avatar: 'h',
        nickname: 'user4',
      },
      solution: {
        id: 8,
        title: 'Solution5 for Problem',
      },
    },
  ],
  _link: {
    nextCursor: 5,
  },
};
export default function index() {
  const dispatch = useDispatch();
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
      {tests.solutions.map((test) => (
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
