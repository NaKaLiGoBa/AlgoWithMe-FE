import { React } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Radio from '../../../atoms/Input/Radio';
import { setSelectedOption } from '../../../../../store/quizSlice';

export default function index() {
  const currentQuiz = useSelector((state) => state.quiz.currentQuiz);
  const dispatch = useDispatch();

  const handleOptionChange = (e) => {
    dispatch(setSelectedOption(e.target.value));
  };

  return (
    <div className="flex flex-wrap ml-[120px] ">
      {currentQuiz.choiceOrInitials.map((option) => (
        <div key={option} className="w-1/2 p-2 text-[20px] mb-[35px]">
          <Radio
            label={option}
            name="option"
            value={option}
            onChange={handleOptionChange}
          />
        </div>
      ))}
    </div>
  );
}
