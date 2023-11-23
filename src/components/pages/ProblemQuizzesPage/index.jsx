import { React } from 'react';
import { useSelector } from 'react-redux';

import ProblemQuizzesTemplate from '../../UI/templates/ProblemQuizzesTemplate';

export default function index() {
  const { currentQuiz } = useSelector((state) => state.quiz);

  return <ProblemQuizzesTemplate currentQuiz={currentQuiz} />;
}
