import { useSelector } from 'react-redux';
import React from 'react';

export default function index() {
  const { number, currentQuiz } = useSelector((state) => state.quiz);
  return (
    <div className="mt-7">
      Q.{number + 1}
      <div>{currentQuiz.description}</div>
    </div>
  );
}
