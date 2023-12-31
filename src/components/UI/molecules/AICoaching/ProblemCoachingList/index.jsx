import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ProblemListFooter from '../../Problem/ProblemListFooter';
import getProblems from '../../../../../utils/api/v1/problem/getProblems';
import {
  nextScreen,
  setSelectedHintOption,
  setSelectedProblemId,
} from '../../../../../store/AIChatSlice';
import { setProblems } from '../../../../../store/problemsSlice';

export default function index() {
  const dispatch = useDispatch();
  const chatProblemId = useSelector((state) => state.chat.chatProblemId);
  const { totalPages, problems } = useSelector((state) => state.problems);
  const [page, setPage] = useState(1);

  useEffect(() => {
    async function fetchData() {
      const params = { page: page - 1 };
      const response = await getProblems(params);
      if (response.success) {
        dispatch(setProblems(response.data));
      } else {
        console.log(response.error);
      }
    }
    fetchData();
  }, [dispatch, page]);

  const problemChatClick = (id) => {
    dispatch(setSelectedProblemId(id));
    dispatch(nextScreen());
    dispatch(setSelectedHintOption(null));
  };

  return (
    <div>
      <ul>
        {problems.map((problem) => (
          <li
            key={problem.id}
            className={`p-3 font-bold border hover:bg-slate-200 ${
              Number(problem.id) === Number(chatProblemId) ? 'bg-slate-200' : ''
            }`}
          >
            <button type="button" onClick={() => problemChatClick(problem.id)}>
              {problem.number}
              {'   '}
              {problem.title}
            </button>
          </li>
        ))}
      </ul>
      <ProblemListFooter
        totalPages={totalPages}
        currentPage={page}
        setPage={setPage}
      />
    </div>
  );
}
