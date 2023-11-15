import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Close from '../../atoms/Icon/Close';
import QuestionCheckbox from './QuestionCheckbox';
import Chevron from '../../atoms/Icon/Chevron';
import ProblemCoachingList from './ProblemCoachingList';
import Message from './Message';
import { nextScreen, prevScreen } from '../../../../store/AIChatSlice';

export default function index({ handleChatToggle }) {
  const dispatch = useDispatch();
  const currentScreen = useSelector((state) => state.chat.currentScreen);

  const handlePrevClick = () => {
    dispatch(prevScreen());
  };

  const handleNextClick = () => {
    dispatch(nextScreen());
  };
  const screenTexts = [
    { prev: '목록', next: '답변' },
    { prev: '목록', middle: '답변', next: '힌트' },
    { prev: '답변', middle: '힌트' },
  ];
  const currentText = screenTexts[currentScreen];
  const screens = [<ProblemCoachingList />, <Message />, <QuestionCheckbox />];
  return (
    <div className="w-[500px] h-[450px] bg-white shadow-2xl rounded-xl ">
      <div className="bg-[#7F84F8] text-white text-base">
        <Close onClick={handleChatToggle} />
        <div className="flex justify-between p-2 ">
          <div className="flex items-center ">
            <Chevron onClick={handlePrevClick} />
            {currentText.prev && <span>{currentText.prev}</span>}
          </div>
          {currentText.middle && <span>{currentText.middle}</span>}
          <div className="flex items-center ">
            {currentText.next && <span>{currentText.next}</span>}
            <Chevron className="rotate-180" onClick={handleNextClick} />
          </div>
        </div>
      </div>
      {screens[currentScreen]}
    </div>
  );
}
