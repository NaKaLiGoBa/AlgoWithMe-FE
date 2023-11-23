import React, { useEffect, useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setProblems } from '../../../../../store/problemsSlice';
import Link from '../../../atoms/Text/Link';
import ProblemListFooter from '../ProblemListFooter';
import DropdownMenu from '../../../atoms/Input/Dropdown';
import getProblems from '../../../../../utils/api/v1/problem/getProblems';
import { formatPercentage } from '../../../../../utils/utils';
import Close from '../../../atoms/Icon/Close';

function Th({ children }) {
  return (
    <th className="py-2 text-sm text-[#9f9f9f] border-black border-b-1">
      {children}
    </th>
  );
}

function Td({ children, className = '' }) {
  return <td className={`text-center p-2 ${className}`}>{children}</td>;
}

export default function index() {
  const difficulty = useSelector((state) => state.problems.difficulties);
  const status = useSelector((state) => state.problems.status);
  const tags = useSelector((state) => state.problems.tags);
  const [selectedDifficulty, setDifficulty] = useState('');
  const [selectedStatus, setStatus] = useState('');
  const [selectedTag, setTag] = useState('');

  const dispatch = useDispatch();
  const problems = useSelector((state) => state.problems.problems);
  const { totalPages } = useSelector((state) => state.problems);
  const [page, setPage] = useState(1);

  function getDifficulty(d) {
    if (d === '어려움') return <p className="text-rose-600 ">어려움</p>;
    if (d === '보통') return <p className="text-yellow-600">보통</p>;
    if (d === '쉬움') return <p className="text-green-600">쉬움</p>;
    return null;
  }

  useEffect(() => {
    const loadProblems = async () => {
      let params = { page: page - 1 };
      if (selectedTag !== '') {
        params = { ...params, tags: selectedTag };
      }
      if (selectedDifficulty !== '') {
        params = { ...params, difficulty: selectedDifficulty };
      }
      if (selectedStatus !== '') {
        params = { ...params, status: selectedStatus };
      }

      getProblems(params)
        .then((response) => response.data)
        .then((data) => {
          dispatch(setProblems(data));
        })
        .catch((error) => console.error('Error loading problems:', error));
    };

    loadProblems();
  }, [dispatch, page, selectedDifficulty, selectedStatus, selectedTag]);

  return (
    <div className="flex flex-col gap-12 items-center bg-white py-5 px-5 rounded-xl shadow-lg">
      <div className="flex flex-row gap-8">
        <DropdownMenu
          title="난이도"
          list={difficulty}
          handleSelectItem={setDifficulty}
        />
        <DropdownMenu title="상태" list={status} handleSelectItem={setStatus} />
        <DropdownMenu title="태그" list={tags} handleSelectItem={setTag} />
      </div>
      <div className="flex">
        {selectedDifficulty && (
          <div className="flex bg-[#44576c] text-white">
            {selectedDifficulty}
            <Close className="!w-4 !h-4" onClick={() => setDifficulty('')} />
          </div>
        )}
        {selectedStatus && (
          <div className="flex">
            {selectedStatus}
            <div className="rounded-full bg-[#e6e6e6]">
              <Close onClick={() => setStatus('')} />
            </div>
          </div>
        )}
        {selectedTag && (
          <div className="flex">
            {selectedTag}
            <Close onClick={() => setTag('')} />
          </div>
        )}
      </div>
      <table className="text-sm w-[800px] table-auto ">
        <thead>
          <tr>
            <Th>번호</Th>
            <Th>상태</Th>
            <Th>제목</Th>
            <Th>정답률 (%)</Th>
            <Th>난이도</Th>
          </tr>
        </thead>
        <tbody>
          {problems.map((problem, index) => (
            <tr
              key={problem.id}
              className={`${index % 2 === 0 ? 'bg-[#e6e6e6]' : 'bg-white'}`}
            >
              <Td>{problem.number}</Td>
              <Td>{problem.status}</Td>
              <Td className="text-left">
                <Link to={`/problems/${problem.id}`}>{problem.title}</Link>
              </Td>
              <Td>{formatPercentage(problem.acceptance)}</Td>
              <Td>{getDifficulty(problem.difficulty)}</Td>
            </tr>
          ))}
        </tbody>
      </table>
      <ProblemListFooter
        totalPages={totalPages}
        currentPage={page}
        setPage={setPage}
      />
    </div>
  );
}
