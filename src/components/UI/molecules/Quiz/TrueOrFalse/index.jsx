import { React } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { True, False } from '../../../atoms/Icon/TrueOrFalse';
import { setSelectedOption } from '../../../../../store/quizSlice';

export default function index() {
  const dispatch = useDispatch();
  const { isAnswered, selectedOption } = useSelector((state) => state.quiz);
  const handleOptionClick = (option) => {
    dispatch(setSelectedOption(option));
  };
  return (
    <div className="flex justify-center gap-[250px] ">
      <button
        type="button"
        onClick={() => handleOptionClick('o')}
        disabled={isAnswered}
        className={`p-[30px] border-[#385FE7] border shadow-lg  ${
          selectedOption === 'o' ? 'bg-[#385FE7]' : 'bg-white'
        }`}
      >
        <True
          color={selectedOption === 'o' ? 'white' : 'black'}
          className="flex justify-center"
        />
      </button>
      <button
        type="button"
        onClick={() => handleOptionClick('x')}
        disabled={isAnswered}
        className={`p-[30px] border border-[#CB3131] shadow-lg ${
          selectedOption === 'x' ? 'bg-[#CB3131]' : 'bg-white'
        }`}
      >
        <False color={selectedOption === 'x' ? 'white' : 'black'} />
      </button>
    </div>
  );
}
