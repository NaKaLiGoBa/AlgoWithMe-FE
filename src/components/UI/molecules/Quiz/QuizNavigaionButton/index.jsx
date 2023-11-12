import { React, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../../../atoms/Input/Button';
import {
  nextQuizNumber,
  prevQuizNumber,
  setSelectedOption,
} from '../../../../../store/quizSlice';

export default function index({ totalCount, selectedOption }) {
  const dispatch = useDispatch();
  const number = useSelector((state) => state.quiz.number);
  const [isAnswered, setIsAnswered] = useState(false);
  const lastQuestion = totalCount === number + 1;

  const handlePrevClick = () => {
    dispatch(prevQuizNumber());
    setIsAnswered(false);
    dispatch(setSelectedOption(null));
  };
  const ValidateAnswer = () => {
    if (selectedOption !== null && selectedOption !== '') {
      setIsAnswered(true);
    } else {
      alert('문제를 풀어주세요');
    }
  };

  const handleNextClick = () => {
    dispatch(nextQuizNumber());
    dispatch(setSelectedOption(null));
    setIsAnswered(false);
  };
  return (
    <div>
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
