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
            <True color="green" animated number={number} questionAnswer />
          )}
          {correctAnswer === false && (
            <False color="red" animated number={number} questionAnswer />
          )}
          {correctAnswer === null && (
            <True color="black" number={number} questionAnswer />
          )}
        </div>
        <div className="ml-[100px]">{currentQuiz.description}</div>
      </div>
    </div>
  );
}
