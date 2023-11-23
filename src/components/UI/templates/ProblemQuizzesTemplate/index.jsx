import React from 'react';
import Header from '../../molecules/Navigation/Header';
import QuestionBox from '../../molecules/Quiz/QuestionBox';
import Multiplechoice from '../../molecules/Quiz/MultipleChoice';
import QuizNavigationButton from '../../molecules/Quiz/QuizNavigaionButton';
import TrueOrFalse from '../../molecules/Quiz/TrueOrFalse';
import Initial from '../../molecules/Quiz/Initials';
import AnswerExplanation from '../../molecules/Quiz/AnswerExplanation';
import Button from '../../atoms/Input/Button';

export default function index({ currentQuiz, quizzes, handleBackClick }) {
  return (
    <div className="bg-[#D9D9D9] h-screen realative ">
      <Header />
      <div className="absolute  top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white px-7 py-4 rounded-xl shadow-2xl w-[1300px] h-[700px] flex flex-col ">
        {quizzes.length === 0 ? (
          <>
            <Button onClick={handleBackClick}>돌아가기</Button>
            <span className="mt-2">현재 이 문제에 대한 퀴즈가 없습니다</span>
          </>
        ) : (
          <>
            <QuestionBox />
            <div className="flex-grow mt-[30px] ">
              {currentQuiz.type === 'choice' && <Multiplechoice />}
              {currentQuiz.type === 'ox' && <TrueOrFalse />}
              {currentQuiz.type === 'initial' && (
                <Initial currentQuiz={currentQuiz} />
              )}
            </div>
            <AnswerExplanation />
            <QuizNavigationButton currentQuiz={currentQuiz} />
          </>
        )}
      </div>
    </div>
  );
}
