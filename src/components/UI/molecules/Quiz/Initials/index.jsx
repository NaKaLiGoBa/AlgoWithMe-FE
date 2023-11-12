import { React, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setInitialAnswer } from '../../../../../store/quizSlice';

export default function index() {
  const dispatch = useDispatch();
  const initials = useSelector(
    (state) => state.quiz.currentQuiz.choiceOrInitials,
  );
  const initialAnswer = useSelector((state) => state.quiz.initialAnswer);
  const [answers, setAnswers] = useState(new Array(initials.length).fill(''));

  useEffect(() => {
    const userAnswer = answers.join('');
    dispatch(setInitialAnswer(userAnswer));
    console.log('c', initialAnswer);
  }, [answers, dispatch]);

  const handleChange = (idx, value) => {
    const text = value.slice(0, 1);
    const newAnswers = [...answers];
    newAnswers[idx] = text;
    setAnswers(newAnswers);
  };
  return (
    <div className="flex">
      {initials.map((initial, idx) => (
        <input
          key={idx}
          type="text"
          maxLength={1}
          value={answers[idx]}
          onChange={(e) => handleChange(idx, e.target.value)}
          placeholder={initial}
          size={1}
          className=" bg-[#D9D9D9] w-[100px] h-[100px] text-black text-[25px] p-0 border-0 text-center m-2 focus:outline-none"
        />
      ))}
    </div>
  );
}
