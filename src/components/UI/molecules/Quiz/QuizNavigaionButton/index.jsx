import { React } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../../../atoms/Input/Button';
import {
  nextQuizNumber,
  prevQuizNumber,
  setCorrectAnswer,
  setIsAnswered,
  setSelectedOption,
} from '../../../../../store/quizSlice';

export default function index({ totalCount, selectedOption, currentQuiz }) {
  const dispatch = useDispatch();
  const { number, isAnswered, initialAnswer } = useSelector(
    (state) => state.quiz,
  );
  const lastQuestion = totalCount === number + 1;

  const handlePrevClick = () => {
    dispatch(prevQuizNumber(false));
    dispatch(setIsAnswered(false));
    dispatch(setSelectedOption(null));
    dispatch(setCorrectAnswer(null));
  };
  const ValidateAnswer = () => {
    let isCorrect = false;
    if (currentQuiz.type === 'initial') {
      isCorrect = initialAnswer === currentQuiz.answer;
      dispatch(setCorrectAnswer(isCorrect));
      dispatch(setIsAnswered(true));
    } else if (selectedOption !== null && selectedOption !== '') {
      isCorrect = selectedOption === currentQuiz.answer;
      dispatch(setCorrectAnswer(isCorrect));
      dispatch(setIsAnswered(true));
    } else {
      alert('문제를 풀어주세요');
    }
  };

  const handleNextClick = () => {
    dispatch(nextQuizNumber());
    dispatch(setSelectedOption(null));
    dispatch(setIsAnswered(false));
    dispatch(setCorrectAnswer(null));
  };
  return (
    <div className="flex justify-end gap-4">
      <Button
        className="p-3 rounded-md !bg-[#D9D9D9]"
        onClick={handlePrevClick}
      >
        이전문제
      </Button>
      {!isAnswered && (
        <Button onClick={ValidateAnswer} className="p-3 rounded-md">
          정답확인
        </Button>
      )}
      {isAnswered && !lastQuestion && (
        <Button
          className="p-3 rounded-md !bg-[#63B758]"
          onClick={handleNextClick}
        >
          다음문제
        </Button>
      )}
      {isAnswered && lastQuestion && (
        <Button className="p-3 rounded-md  !bg-[#63B758]"> 문제풀기</Button>
      )}
    </div>
  );
}
