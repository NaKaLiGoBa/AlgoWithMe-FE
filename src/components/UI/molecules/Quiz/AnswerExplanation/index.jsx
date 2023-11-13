import React from 'react';
import { useSelector } from 'react-redux';

export default function index() {
  const { currentQuiz, correctAnswer, isAnswered } = useSelector(
    (state) => state.quiz,
  );
  return (
    <div className="flex flex-col items-end mb-7">
      {isAnswered && (
        <>
          <div
            style={{ color: correctAnswer ? 'black' : 'red' }}
            className="text-[20px] font-bold "
          >
            {currentQuiz.answer}
          </div>
          <div style={{ color: 'black' }}>{currentQuiz.explain}</div>
        </>
      )}
    </div>
  );
}
