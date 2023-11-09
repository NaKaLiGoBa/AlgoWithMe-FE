import React from 'react';
import { useDispatch } from 'react-redux';
import Button from '../../../atoms/Input/Button';
import { nextQuizNumber, prevQuizNumber } from '../../../../../store/quizSlice';

export default function index() {
  const dispatch = useDispatch();

  const handlePrevClick = () => {
    dispatch(prevQuizNumber());
  };
  const handleNextClick = () => {
    dispatch(nextQuizNumber());
  };
  return (
    <div>
      <Button
        className="p-3 rounded-md !bg-[#D9D9D9]"
        onClick={handlePrevClick}
      >
        이전문제
      </Button>
      <Button className="p-3 rounded-md"> 정답확인</Button>
      <Button
        className="p-3 rounded-md !bg-[#63B758]"
        onClick={handleNextClick}
      >
        다음문제
      </Button>
      <Button className="p-3 rounded-md  !bg-[#63B758]"> 문제풀기</Button>
    </div>
  );
}
