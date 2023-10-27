import React, { useState } from 'react';
// import ProblemItem from '../ProblemItem'
import Link from '../../../atoms/Text/Link';

const testData = {
  problems: [
    {
      id: 0,
      number: 0,
      status: '성공',
      title: '문제 1',
      acceptance: '66.6',
      difficulty: '쉬움',
      tags: ['DFS', '그래프'],
    },
    {
      id: 1,
      number: 1,
      status: '실패',
      title: '문제 2',
      acceptance: '30.5',
      difficulty: '보통',
      tags: ['배열', '정렬'],
    },
    {
      id: 2,
      number: 2,
      status: '진행중',
      title: '문제 3',
      acceptance: '75.0',
      difficulty: '어려움',
      tags: ['동적 프로그래밍', '수학'],
    },
    {
      id: 3,
      number: 3,
      status: '성공',
      title: '문제 4',
      acceptance: '50.0',
      difficulty: '쉬움',
      tags: ['문자열', '해시맵'],
    },
    {
      id: 4,
      number: 4,
      status: '성공',
      title: '문제 4',
      acceptance: '50.0',
      difficulty: '쉬움',
      tags: ['문자열', '해시맵'],
    },
    {
      id: 5,
      number: 5,
      status: '성공',
      title: '문제 4',
      acceptance: '50.0',
      difficulty: '쉬움',
      tags: ['문자열', '해시맵'],
    },
    {
      id: 6,
      number: 6,
      status: '성공',
      title: '문제 4',
      acceptance: '50.0',
      difficulty: '쉬움',
      tags: ['문자열', '해시맵'],
    },
    {
      id: 7,
      number: 7,
      status: '성공',
      title: '문제 4',
      acceptance: '50.0',
      difficulty: '쉬움',
      tags: ['문자열', '해시맵'],
    },
    {
      id: 8,
      number: 8,
      status: '성공',
      title: '문제 4',
      acceptance: '50.0',
      difficulty: '쉬움',
      tags: ['문자열', '해시맵'],
    },
    {
      id: 9,
      number: 9,
      status: '성공',
      title: '문제 4',
      acceptance: '50.0',
      difficulty: '쉬움',
      tags: ['문자열', '해시맵'],
    },
    {
      id: 10,
      number: 10,
      status: '성공',
      title: '문제 4',
      acceptance: '50.0',
      difficulty: '쉬움',
      tags: ['문자열', '해시맵'],
    },
    {
      id: 11,
      number: 11,
      status: '성공',
      title: '문제 4',
      acceptance: '50.0',
      difficulty: '쉬움',
      tags: ['문자열', '해시맵'],
    },
    {
      id: 12,
      number: 12,
      status: '성공',
      title: '문제 4',
      acceptance: '50.0',
      difficulty: '쉬움',
      tags: ['문자열', '해시맵'],
    },
    {
      id: 13,
      number: 13,
      status: '성공',
      title: '문제 4',
      acceptance: '50.0',
      difficulty: '쉬움',
      tags: ['문자열', '해시맵'],
    },
    {
      id: 14,
      number: 14,
      status: '성공',
      title: '문제 4',
      acceptance: '50.0',
      difficulty: '쉬움',
      tags: ['문자열', '해시맵'],
    },
    {
      id: 15,
      number: 15,
      status: '성공',
      title: '문제 4',
      acceptance: '50.0',
      difficulty: '쉬움',
      tags: ['문자열', '해시맵'],
    },
    {
      id: 16,
      number: 16,
      status: '성공',
      title: '문제 4',
      acceptance: '50.0',
      difficulty: '쉬움',
      tags: ['문자열', '해시맵'],
    },
    {
      id: 17,
      number: 17,
      status: '성공',
      title: '문제 4',
      acceptance: '50.0',
      difficulty: '쉬움',
      tags: ['문자열', '해시맵'],
    },
    {
      id: 18,
      number: 18,
      status: '성공',
      title: '문제 4',
      acceptance: '50.0',
      difficulty: '쉬움',
      tags: ['문자열', '해시맵'],
    },
    {
      id: 19,
      number: 19,
      status: '성공',
      title: '문제 4',
      acceptance: '50.0',
      difficulty: '쉬움',
      tags: ['문자열', '해시맵'],
    },
    {
      id: 20,
      number: 20,
      status: '성공',
      title: '문제 4',
      acceptance: '50.0',
      difficulty: '쉬움',
      tags: ['문자열', '해시맵'],
    },
    {
      id: 21,
      number: 21,
      status: '성공',
      title: '문제 4',
      acceptance: '50.0',
      difficulty: '쉬움',
      tags: ['문자열', '해시맵'],
    },
  ],
};

export default function index() {
  const [problems, setProblems] = useState(testData.problems);

  return (
    <table className="border-separate border-spacing-x-0 border-spacing-2">
      <thead>
        <tr>
          <th>문제 번호</th>
          <th>상태</th>
          <th>문제 제목</th>
          <th>정답률</th>
          <th>난이도</th>
        </tr>
      </thead>
      <tbody>
        {problems.map((problem) => (
          <tr key={problem.id} className="my-5 bg-[#D9D9D9]">
            <td>{problem.number}</td>
            <td>{problem.status}</td>
            <td>
              <Link to={`/problems/${problem.number}`}>{problem.title}</Link>
            </td>
            <td>{problem.acceptance}</td>
            <td>{problem.difficulty}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
