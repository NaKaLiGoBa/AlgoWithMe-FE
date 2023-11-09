import { useSelector, useDispatch } from 'react-redux';
import { React, useEffect } from 'react';
import MiniQuiz from '../../../../../../public/api/miniQuiz.json';
import { setQuizzes } from '../../../../../store/quizSlice';

export default function index() {
  const dispatch = useDispatch();
  const { number, currentQuiz } = useSelector((state) => state.quiz);

  useEffect(() => {
    dispatch(setQuizzes(MiniQuiz));
  }, [dispatch]);

  console.log(currentQuiz);
  console.log(number);
  return (
    <div className="mt-7">
      Q.{number + 1}
      <div>{currentQuiz.description}</div>
    </div>
  );
}
