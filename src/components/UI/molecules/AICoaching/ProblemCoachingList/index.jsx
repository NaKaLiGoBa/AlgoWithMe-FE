import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import problemsData from '../../../../../../public/api/problems.json';

import {
  nextScreen,
  setSeletedProblemId,
} from '../../../../../store/AIChatSlice';

export default function index() {
  const dispatch = useDispatch();
  // const selectedProblemId = useSelector(
  //   (state) => state.chat.selectedProblemId,
  // );
  const problems = useSelector((state) => state.problems.problems);

  // const problemstest = problemsData.problems;

  const problemChatClick = (id) => {
    dispatch(setSeletedProblemId(id));
    dispatch(nextScreen());
  };

  return (
    <ul>
      {problems.map((problem) => (
        <li
          key={problem.id}
          className="p-3 text-lg font-bold border hover:bg-slate-200"
        >
          <button type="button" onClick={() => problemChatClick(problem.id)}>
            {problem.number}
            {'   '}
            {problem.title}
          </button>
        </li>
      ))}
    </ul>
  );
}
