import React from 'react';
import { useDispatch } from 'react-redux';
import Checkbox from '../../../atoms/Input/Checkbox';
import { setSelectedOptions } from '../../../../../store/AIChatSlice';

export default function index() {
  const dispatch = useDispatch();

  const options = [
    '엣지케이스',
    '코드 구조와 가독성',
    '코드 최적화',
    '알고리즘 선택과 설계',
    '반례',
  ];

  const handleCheckbox = () => {
    dispatch(setSelectedOptions((prev) => [prev.option]));
  };

  return (
    <div>
      {options.map((option, idx) => (
        <Checkbox id={idx} label={option} onChange={handleCheckbox} />
      ))}
    </div>
  );
}
