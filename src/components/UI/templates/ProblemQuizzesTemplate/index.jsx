import React from 'react';
import Header from '../../molecules/Navigation/Header';
import QuestionBox from '../../molecules/Quiz/QuestionBox';
import Multiplechoice from '../../molecules/Quiz/MultipleChoice';
import QuizNavigationButton from '../../molecules/Quiz/QuizNavigaionButton';
import TrueOrFalse from '../../molecules/Quiz/TrueOrFalse';
import Initial from '../../molecules/Quiz/Initials';
import AnswerExplanation from '../../molecules/Quiz/AnswerExplanation';

export default function index({ currentQuiz, totalCount, selectedOption }) {
  return (
    <div className="bg-[#D9D9D9] h-screen realative ">
      <Header />
      <div className="absolute  top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white px-7 py-4 rounded-xl shadow-2xl w-[1300px] h-[700px] flex flex-col ">
        <QuestionBox />
        <div className="flex-grow mt-[30px] ">
          {currentQuiz.type === 'choice' && <Multiplechoice />}
          {currentQuiz.type === 'ox' && (
            <TrueOrFalse selectedOption={selectedOption} />
          )}
          {currentQuiz.type === 'initial' && (
            <Initial currentQuiz={currentQuiz} />
          )}
        </div>
        <AnswerExplanation />
        <QuizNavigationButton
          totalCount={totalCount}
          selectedOption={selectedOption}
          currentQuiz={currentQuiz}
        />
      </div>
    </div>
  );
}
