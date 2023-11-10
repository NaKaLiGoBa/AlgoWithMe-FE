import { useEffect, React } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MiniQuiz from '../../../../public/api/miniQuiz.json';
import { setQuizzes } from '../../../store/quizSlice';
import ProblemQuizzesTemplate from '../../UI/templates/ProblemQuizzesTemplate';

export default function index() {
  const dispatch = useDispatch();
  const currentQuiz = useSelector((state) => state.quiz.currentQuiz);

  console.log(currentQuiz);

  useEffect(() => {
    dispatch(setQuizzes(MiniQuiz));
  }, [dispatch]);
  return <ProblemQuizzesTemplate currentQuiz={currentQuiz} />;
}
