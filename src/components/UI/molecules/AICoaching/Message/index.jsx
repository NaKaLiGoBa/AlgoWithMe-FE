import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import getCoachesByProblemId from '../../../../../utils/api/v1/coach/getCoachesByProblemId';

export default function index() {
  const problemId = useSelector((state) => state.problem.number);
  const [message, setMessage] = useState({ answers: [] });

  useEffect(() => {
    async function fetchData() {
      const response = await getCoachesByProblemId(problemId);
      if (response.success) {
        setMessage(response.data);
      } else {
        console.log(response.error);
      }
    }
    fetchData();
  }, [problemId]);
  return (
    <div className="p-4">
      {message.answers.map((answer, idx) => (
        <div key={idx} className="flex flex-col">
          <div className="ml-4 mr-auto   bg-blue-100 rounded-xl p-3 shadow-lg">
            <p className="text-sm text-blue-800">{answer.question}</p>
          </div>
          <div className="mr-4 ml-auto bg-green-100 rounded-xl p-3 shadow-lg mt-2">
            <p className="text-sm text-green-800">{answer.answer}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
