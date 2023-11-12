import { useSelector } from 'react-redux';
import React from 'react';
import { True, False } from '../../../atoms/Icon/TrueOrFalse';

export default function index() {
  const { number, currentQuiz, correctAnswer } = useSelector(
    (state) => state.quiz,
  );
  console.log(correctAnswer);
  return (
    <div className="mt-7">
      <div className="h-[100px]">
        {correctAnswer === true && (
          <True color="green" animated number={number} questionAnswer />
        )}
        {correctAnswer === false && (
          <False color="red" animated number={number} questionAnswer />
        )}
        {correctAnswer === null && (
          <True color="black" number={number} questionAnswer />
        )}
      </div>
      <div>{currentQuiz.description}</div>
    </div>
  );
}
