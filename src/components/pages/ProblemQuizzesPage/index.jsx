import { useEffect, React } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { setQuizzes } from '../../../store/quizSlice';
import ProblemQuizzesTemplate from '../../UI/templates/ProblemQuizzesTemplate';
import getQuizzesByProblemId from '../../../utils/api/v1/problem/getQuizzesByProblemId';

export default function index() {
  const dispatch = useDispatch();
  const { problemId } = useParams();
  const currentQuiz = useSelector((state) => state.quiz.currentQuiz);

  useEffect(() => {
    async function fetchQuizzes() {
      const response = await getQuizzesByProblemId(problemId);
      if (response.success) {
        dispatch(setQuizzes(response.data));
      } else {
        console.log(response.error);
      }
    }
    fetchQuizzes();
  }, [dispatch, problemId]);

  return <ProblemQuizzesTemplate currentQuiz={currentQuiz} />;
}
