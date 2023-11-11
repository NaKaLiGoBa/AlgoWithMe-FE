import React, { useEffect, useState } from 'react';
import Link from '../../../atoms/Text/Link';
import ProblemListFooter from '../ProblemListFooter';
import PaginationRange from '../../../../../hooks/usePaginationRange';
import testData from '../../../../../../public/api/TestProblemData.json';

function Th({ children }) {
  return <th className="py-2 text-sm border-black border-b-1">{children}</th>;
}

function Td({ children, className = '' }) {
  return <td className={`text-center p-2 ${className}`}>{children}</td>;
}

export default function index() {
  const [problems, setProblems] = useState(testData.problems);
  const [page, setPage] = useState(1);
  const rowsPerPage = 20;
  const { slice, range } = PaginationRange(problems, page, rowsPerPage);

  return (
    <div>
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
                <Link to={`/problems/${problem.number}`}>{problem.title}</Link>
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
