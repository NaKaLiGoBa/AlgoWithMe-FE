import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setProblems } from '../../../../../store/problemsSlice';
import Link from '../../../atoms/Text/Link';
import ProblemListFooter from '../ProblemListFooter';
import PaginationRange from '../../../../../hooks/usePaginationRange';
import DropdownMenu from '../../../atoms/Input/Dropdown';
import getProblems from '../../../../../utils/api/v1/problem/getProblems';

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
  const difficulty = ['쉬움', '보통', '어려움'];
  const status = ['성공', '실패', '미해결'];
  const tags = ['DFS', 'BFS', 'Sort'];
  const [selectedDifficulty, setDifficulty] = useState('');
  const [selectedStatus, setStatus] = useState('');
  const [selectedTag, setTag] = useState('');

  const dispatch = useDispatch();
  const problems = useSelector((state) => state.problems.problems);
  const [page, setPage] = useState(1);
  const rowsPerPage = 20;

  useEffect(() => {
    const loadProblems = async () => {
      let params = {};
      if (selectedTag !== '') {
        params = { ...params, tags: selectedTag };
      }
      if (selectedDifficulty !== '') {
        params = { ...params, difficulty: selectedDifficulty };
      }
      if (selectedStatus !== '') {
        params = { ...params, status: selectedStatus };
      }

      try {
        const response = await getProblems(params);
        dispatch(setProblems(response.data)); // 데이터를 스토어에 저장
      } catch (error) {
        console.error('Error loading problems:', error);
      }
    };

    loadProblems();
  }, [dispatch, selectedDifficulty, selectedStatus, selectedTag]);

  const { slice, range } = PaginationRange(problems, page, rowsPerPage);

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
      <table className="text-sm w-[800px] table-auto ">
        <thead>
          <tr>
            <Th>번호</Th>
            <Th>상태</Th>
            <Th>제목</Th>
            <Th>정답률</Th>
            <Th>난이도</Th>
          </tr>
        </thead>
        <tbody>
          {slice.map((problem, index) => (
            <tr
              key={problem.id}
              className={`${index % 2 === 0 ? 'bg-[#e6e6e6]' : 'bg-white'}`}
            >
              <Td>{problem.number}</Td>
              <Td>{problem.status}</Td>
              <Td className="text-left">
                <Link to={`/problems/${problem.id}`}>{problem.title}</Link>
              </Td>
              <Td>{problem.acceptance}</Td>
              <Td>{problem.difficulty}</Td>
            </tr>
          ))}
        </tbody>
      </table>
      <ProblemListFooter
        range={range}
        setPage={setPage}
        page={page}
        slice={slice}
      />
    </div>
  );
}
