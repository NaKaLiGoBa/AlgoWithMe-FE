import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Radio from '../../../atoms/Input/Radio';
import {
  prevScreen,
  setSelectedHintOption,
} from '../../../../../store/AIChatSlice';
import Button from '../../../atoms/Input/Button';
import postCoachesByProblemId from '../../../../../utils/api/v1/coach/postCoachesByProblemId';

export default function index() {
  const selectedHintOption = useSelector(
    (state) => state.chat.selectedHintOption,
  );
  const dispatch = useDispatch();
  const problemNumber = useSelector((state) => state.problem.number);

  const options = [
    '엣지케이스',
    '코드 구조와 가독성',
    '코드 최적화',
    '알고리즘 선택과 설계',
    '반례',
  ];

  const handleOptionClick = (e) => {
    dispatch(setSelectedHintOption(e.target.value));
  };

  const handleCoachingClick = async () => {
    const storedEditor = localStorage.getItem(`editorState_${problemNumber}`);
    const response = await postCoachesByProblemId(
      problemNumber,
      selectedHintOption,
      storedEditor,
    );
    if (response.success) {
      dispatch(prevScreen());
    } else {
      console.log(response.error);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center h-full ">
      <div className="mb-[40px] text-lg">
        {options.map((option, idx) => (
          <Radio
            id={idx}
            label={option}
            value={option}
            onChange={handleOptionClick}
            name="option"
          />
        ))}
      </div>
      <Button className="p-2 w-[100px]" onClick={handleCoachingClick}>
        코칭받기
      </Button>
    </div>
  );
}
