import { React, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setInitialAnswer } from '../../../../../store/quizSlice';

export default function index() {
  const dispatch = useDispatch();
  const initials = useSelector(
    (state) => state.quiz.currentQuiz.choiceOrInitials,
  );
  const { currentQuiz, isAnswered, correctAnswer } = useSelector(
    (state) => state.quiz,
  );
  const [answers, setAnswers] = useState(new Array(initials.length).fill(''));

  useEffect(() => {
    setAnswers(new Array(currentQuiz.choiceOrInitials.length).fill(''));
  }, [currentQuiz]);

  useEffect(() => {
    const userAnswer = answers.join('');
    dispatch(setInitialAnswer(userAnswer));
  }, [answers, dispatch]);

  const handleChange = (idx, value) => {
    const text = value.slice(0, 1);
    const newAnswers = [...answers];
    newAnswers[idx] = text;
    setAnswers(newAnswers);
  };
  const getInputStyle = () => {
    if (isAnswered) {
      return correctAnswer
        ? 'bg-[#63B758] text-[#FFFFFF]'
        : 'bg-[#CB3131] text-[#FFFFFF]';
    }
    return 'bg-[#D9D9D9] text-[#000]';
  };

  return (
    <div className="flex justify-center">
      {initials.map((initial, idx) => (
        <input
          key={idx}
          type="text"
          maxLength={1}
          value={answers[idx]}
          onChange={(e) => handleChange(idx, e.target.value)}
          placeholder={initial}
          size={1}
          disabled={isAnswered}
          className={`${getInputStyle()}  w-[100px] h-[100px] text-[25px] p-0 border-0 text-center m-2 focus:outline-none `}
        />
      ))}
    </div>
  );
}
