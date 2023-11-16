import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Checkbox from '../../../atoms/Input/Checkbox';
import {
  prevScreen,
  setSelectedOptions,
} from '../../../../../store/AIChatSlice';
import Button from '../../../atoms/Input/Button';
import postCoachesByProblemId from '../../../../../utils/api/v1/coach/postCoachesByProblemId';

export default function index() {
  const selectedOptions = useSelector((state) => state.chat.selectedOptions);
  const dispatch = useDispatch();
  const problemNumber = useSelector((state) => state.problem.number);

  const options = [
    '엣지케이스',
    '코드 구조와 가독성',
    '코드 최적화',
    '알고리즘 선택과 설계',
    '반례',
  ];

  const handleCheckbox = (option, checked) => {
    dispatch(setSelectedOptions({ option, checked }));
  };

  const handleCoachingClick = async () => {
    const storedEditor = localStorage.getItem(`editorState_${problemNumber}`);
    const userCheckClick = selectedOptions.join('');
    const response = await postCoachesByProblemId(
      problemNumber,
      userCheckClick,
      storedEditor,
    );
    if (response.success) {
      dispatch(prevScreen());
    } else {
      console.log(response.error);
    }
  };

  return (
    <div>
      {options.map((option, idx) => (
        <Checkbox
          id={idx}
          label={option}
          checked={selectedOptions.includes(option)}
          onChange={(e) => handleCheckbox(option, e.target.checked)}
        />
      ))}
      <Button className="p-2" onClick={handleCoachingClick}>
        코칭받기
      </Button>
    </div>
  );
}
