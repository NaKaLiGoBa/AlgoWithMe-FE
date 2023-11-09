import React from 'react';
import Header from '../../molecules/Navigation/Header';
import Close from '../../atoms/Icon/Close';
import QuestionBox from '../../molecules/Quiz/QuestionBox';
import Multiplechoice from '../../molecules/Quiz/MultipleChoice';
import QuizNavigationButton from '../../molecules/Quiz/QuizNavigaionButton';

export default function index() {
  return (
    <div className="bg-[#D9D9D9] h-screen realative ">
      <Header />
      <div
        className="absolute  top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white px-7 py-4 rounded-xl shadow-2xl w-[1300px] 
      h-[700px] "
      >
        <Close className="absolute right-0 mr-5 " />
        <QuestionBox />
        <Multiplechoice />
        <QuizNavigationButton />
      </div>
    </div>
  );
}
