import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import getCoachesByProblemId from '../../../../../utils/api/v1/coach/getCoachesByProblemId';
import { setChatProblemId } from '../../../../../store/AIChatSlice';
import Chat from '../../../../../../public/api/chat.json';

export default function index() {
  const dispatch = useDispatch();
  const { problemId } = useParams();
  const [answers, setAnswers] = useState({ answers: [] });
  const { selectedProblemId, selectedHintOption } = useSelector(
    (state) => state.chat,
  );

  // useEffect(() => {
  //   async function fetchData() {
  //     const problemChatId = selectedProblemId || problemId;
  //     dispatch(setChatProblemId(problemChatId));
  //     const response = await getCoachesByProblemId(problemChatId);
  //     if (response.success) {
  //       setAnswers(response.data);
  //     } else {
  //       console.log(response.error);
  //     }
  //   }
  //   fetchData();
  // }, [problemId, selectedProblemId]);

  useEffect(() => {
    const problemChatId = selectedProblemId || problemId;
    dispatch(setChatProblemId(problemChatId));
    const selectedAnswer = Chat.data.answers.find(
      (answer) => answer.option === selectedHintOption,
    );
    if (selectedAnswer) {
      setAnswers({ answers: [selectedAnswer] });
    }
  }, [problemId, selectedProblemId, selectedHintOption]);
  return (
    <div className="p-4">
      {answers.answers.map((answer, idx) => (
        <div key={idx} className="flex flex-col">
          <div className="ml-4 mr-auto   bg-blue-100 rounded-xl p-3 shadow-lg">
            <p className="text-sm text-blue-800">{answer.option}</p>
          </div>
          <div className="mr-4 ml-auto bg-green-100 rounded-xl p-3 shadow-lg mt-2">
            <p className="text-sm text-green-800">{answer.answer}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
