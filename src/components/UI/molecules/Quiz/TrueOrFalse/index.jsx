import { React, useState } from 'react';
import { True, False } from '../../../atoms/Icon/TrueOrFalse';

export default function index() {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
  };
  return (
    <div>
      <button
        type="button"
        onClick={() => handleOptionClick('O')}
        className={`p-[30px] border-[#385FE7] border shadow-lg  ${
          selectedOption === 'O' ? 'bg-[#385FE7]' : 'bg-white'
        }`}
      >
        <True
          color={selectedOption === 'O' ? 'white' : 'black'}
          className="flex justify-center"
        />
      </button>
      <button
        type="button"
        onClick={() => handleOptionClick('X')}
        className={`p-[30px] border border-[#CB3131] shadow-lg ${
          selectedOption === 'X' ? 'bg-[#CB3131]' : 'bg-white'
        }`}
      >
        <False color={selectedOption === 'X' ? 'white' : 'black'} />
      </button>
    </div>
  );
}
