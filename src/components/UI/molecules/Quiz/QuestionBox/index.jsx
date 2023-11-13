import { useSelector } from 'react-redux';
import React from 'react';
import { useParams } from 'react-router-dom';
import { True, False } from '../../../atoms/Icon/TrueOrFalse';
import Link from '../../../atoms/Text/Link';
import Close from '../../../atoms/Icon/Close';

export default function index() {
  const { number, currentQuiz, correctAnswer } = useSelector(
    (state) => state.quiz,
  );
  const { problemId } = useParams();
  return (
    <div>
      <Link to={`/problems/${problemId}`}>
        <Close className="absolute right-0 mr-5" />
      </Link>

      <div className="mt-7">
        <div className="h-[100px]">
          {correctAnswer === true && (
            <True color="#63B758" animated number={number} questionNumber />
          )}
          {correctAnswer === false && (
            <False color="#CB3131" animated number={number} questionNumber />
          )}
          {correctAnswer === null && (
            <True color="#D9D9D9" number={number} questionNumber />
          )}
        </div>
        <div className="ml-[100px] text-[20px] font-semibold">
          {currentQuiz.description}
        </div>
      </div>
    </div>
  );
}
