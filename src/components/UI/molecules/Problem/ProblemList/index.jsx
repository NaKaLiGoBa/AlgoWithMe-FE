import React, { useEffect, useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setProblems } from '../../../../../store/problemsSlice';
import Link from '../../../atoms/Text/Link';
import ProblemListFooter from '../ProblemListFooter';
import DropdownMenu from '../../../atoms/Input/Dropdown';
import getProblems from '../../../../../utils/api/v1/problem/getProblems';
import { formatPercentage } from '../../../../../utils/utils';
import Close from '../../../atoms/Icon/Close';
import Clear from '../../../atoms/Icon/Clear';

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

function getDifficulty(d) {
  let color = '';
  let bgColorClass = '';
  if (d === '어려움') {
    color = 'text-rose-700';
    bgColorClass = 'bg-rose-500/30'; // 50% transparency
  } else if (d === '보통') {
    color = 'text-yellow-700';
    bgColorClass = 'bg-yellow-500/30'; // 50% transparency
  } else if (d === '쉬움') {
    color = 'text-green-700';
    bgColorClass = 'bg-green-500/30'; // 50% transparency
  }

  return <p className={`rounded-2xl min-w-[50px] ${bgColorClass} ${color} text-center`}>{d}</p>;
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

  const handleClear = () => {
    setDifficulty('');
    setStatus('');
    setTag('');
  };

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
      <div className="flex gap-2">
        {selectedDifficulty && (
          <div className="flex items-center bg-[#efeeee] py-1 px-[6px] rounded-[4px]">
            {selectedDifficulty}
            <Close
              className="!w-4 !h-4 pl-[2px]"
              onClick={() => setDifficulty('')}
            />
          </div>
        )}
        {selectedStatus && (
          <div className="flex items-center bg-[#efeeee] py-1 px-[6px] rounded-[4px]">
            {selectedStatus}
            <Close
              className="!w-4 !h-4 pl-[2px]"
              onClick={() => setStatus('')}
            />
          </div>
        )}
        {selectedTag && (
          <div className="flex items-center bg-[#efeeee] py-1 px-[6px] rounded-[4px]">
            {selectedTag}
            <Close className="!w-4 !h-4 pl-[2px]" onClick={() => setTag('')} />
          </div>
        )}
        {(selectedDifficulty || selectedStatus || selectedTag) && (
          <button
            type="button"
            onClick={handleClear}
            className="flex items-center ml-1  bg-[#efeeee] py-1 px-[6px] rounded-[4px]"
          >
            <Clear />
            <span className="text-sm pl-1">초기화</span>
          </button>
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
              <Td className="flex justify-center">{getDifficulty(problem.difficulty)}</Td>
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

export {getDifficulty}
