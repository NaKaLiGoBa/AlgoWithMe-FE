import React, { useEffect, useState } from 'react';
import { useParams, useOutletContext } from 'react-router-dom';
import getSubmitsByProblemId from '../../../../utils/api/v1/submit/getSubmitsByProblemId';

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

export default function () {
  const { problemId } = useParams();
  const { setTabs, tabs, solutions, setSolutions, submits, setSubmits } =
    useOutletContext();
  // getSubmitsByProblemId(problemId);

  useEffect(() => {
    if (submits === null) {
      getSubmitsByProblemId(problemId)
        .then((response) => response.data)
        .then((data) => {
          setSubmits(data);
        });
    }
  }, [problemId]);

  if (submits === null) {
    return <div>loading...</div>;
  }

  return (
    <div className="overflow-y-auto h-[100%]">
      <table className="text-sm w-full table-auto ">
        <thead className="sticky top-0 bg-white border-b-[2px]">
          <tr>
            <Th>상태</Th>
            <Th>언어</Th>
            <Th>실행시간</Th>
            <Th>메모리</Th>
            <Th>시간복잡도</Th>
            <Th>공간복잡도</Th>
          </tr>
        </thead>
        <tbody>
          {submits.submits.map((submit, index) => (
            <tr
              key={submit.id}
              className={`${index % 2 === 0 ? 'bg-[#e6e6e6]' : 'bg-white'}`}
            >
              <Td>{submit.status}</Td>
              <Td>{submit.language}</Td>
              <Td>{submit.runtime}</Td>
              <Td>{submit.memory}</Td>
              <Td>{submit.timeComplexity}</Td>
              <Td>{submit.spaceComplexity}</Td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
