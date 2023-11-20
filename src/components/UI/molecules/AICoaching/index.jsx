import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Close from '../../atoms/Icon/Close';
import FixedQuestion from './FixedQuestion';
import Chevron from '../../atoms/Icon/Chevron';
import ProblemCoachingList from './ProblemCoachingList';
import AIResponseViewer from './AIResponseViewer';
import { nextScreen, prevScreen } from '../../../../store/AIChatSlice';
import '../../atoms/Tab/styles.css';

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
    { middle: '목록', next: '답변' },
    { prev: '목록', middle: '답변', next: '힌트' },
    { prev: '답변', middle: '힌트' },
  ];
  const currentText = screenTexts[currentScreen];
  const screens = [
    <ProblemCoachingList />,
    <AIResponseViewer />,
    <FixedQuestion />,
  ];
  return (
    <div className="w-[600px] h-[450px]  bg-gray-100 shadow-2xl rounded-md overflow-auto customTab-scrollbar">
      <div className="bg-[#5a5ed4ca] text-white text-base rounded-t-md p-1 w-full ">
        <Close onClick={handleChatToggle} className="p-0 ml-auto pr-1" />
        <div className="flex justify-between p-1 ">
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
