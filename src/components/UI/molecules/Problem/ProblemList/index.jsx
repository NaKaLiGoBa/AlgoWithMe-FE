import React, { useEffect, useState } from 'react';
import Link from '../../../atoms/Text/Link';
import ProblemListFooter from '../ProblemListFooter';
import PaginationRange from '../../../../../hooks/usePaginationRange';
// import getProblemList from '../../../../../service/problemListService';
import testData from '../../../../../../public/api/TestProblemData.json';

export default function index() {
  // const [problems, setProblems] = useState([]);
  const [problems, setProblems] = useState(testData.problems);
  const [page, setPage] = useState(1);
  const rowsPerPage = 20;
  const { slice, range } = PaginationRange(problems, page, rowsPerPage);

  // useEffect(() => {
  //   const fetchProblems = async () => {
  //     try {
  //       const problemData = await getProblemList(page);
  //       setProblems(problemData);
  //     } catch (error) {
  //       console.error(
  //         'An error occurred while fetching the problem list:',
  //         error,
  //       );
  //     }
  //   };
  //   console.log('o', page);

  //   fetchProblems();
  // }, [page]);

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
