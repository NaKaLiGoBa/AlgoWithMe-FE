import { useEffect, React } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { setQuizzes } from '../../../store/quizSlice';
import ProblemQuizzesTemplate from '../../UI/templates/ProblemQuizzesTemplate';
import getQuizzesByProblemId from '../../../utils/api/v1/problem/getQuizzesByProblemId';

export default function index() {
  const dispatch = useDispatch();
  const { problemId } = useParams();
  const { currentQuiz, quizzes } = useSelector((state) => state.quiz);
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(-1);
  };

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

  return (
    <ProblemQuizzesTemplate
      currentQuiz={currentQuiz}
      quizzes={quizzes}
      handleBackClick={handleBackClick}
    />
  );
}
