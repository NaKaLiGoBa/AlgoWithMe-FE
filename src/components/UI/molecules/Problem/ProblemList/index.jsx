import React, { useState } from 'react';
import Link from '../../../atoms/Text/Link';
import testData from '../../../../../../public/api/v1/TestProblemData.json';
import ProblemListFooter from '../ProblemListFooter';
import PaginationRange from '../../../../../hooks/usePaginationRange';

export default function index() {
  const [problems, setProblems] = useState(testData.problems);
  const [page, setPage] = useState(1);
  const rowsPerPage = 20;
  const { slice, range } = PaginationRange(problems, page, rowsPerPage);
  // fetch('http://localhost:3000/api/v1/TestProvlemData.json', {
  //   method: 'GET',
  // })
  //   .then((res) => res.json())
  //   .then((data) => {
  //     console.log(data.result);
  //   });

  return (
    <div>
      <table className="border-separate border-spacing-y-4 mx-11 text-xl  rounded-[20px] border-4 w-[1000px] ">
        <thead>
          <tr>
            <th className="py-2 border-black border-b-2">번호</th>
            <th className="py-2 border-black border-b-2">상태</th>
            <th className="py-2 border-black border-b-2">제목</th>
            <th className="py-2 border-black border-b-2">정답률</th>
            <th className="py-2 border-black border-b-2">난이도</th>
          </tr>
        </thead>
        <tbody>
          {slice.map((problem) => (
            <tr key={problem.id} className=" bg-[#ebeaea] rounded">
              <td className="px-2 py-3 text-center">{problem.number}</td>
              <td className="px-2 text-center">{problem.status}</td>
              <td className="w-[600px] px-2">
                <Link to={`/problems/${problem.number}`}>{problem.title}</Link>
              </td>
              <td className="px-2 text-center">{`${problem.acceptance}%`}</td>
              <td className="px-2 text-center">{problem.difficulty}</td>
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
