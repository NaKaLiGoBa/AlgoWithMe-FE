import { useState, React } from 'react';
import { useSelector } from 'react-redux';
import Radio from '../../../atoms/Input/Radio';

export default function index() {
  const currentQuiz = useSelector((state) => state.quiz.currentQuiz);
  const [selectedOption, SetSelectedOption] = useState('');

  const handleOptionChange = (e) => {
    SetSelectedOption(e.target.value);
  };

  return (
    <div>
      {currentQuiz.choiceOrInitials.map((option) => (
        <div key={option}>
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
