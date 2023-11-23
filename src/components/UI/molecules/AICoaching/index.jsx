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
  const problemTitle = useSelector(
    (state) =>
      state.problems.problems.find(
        (problem) => problem.id === Number(state.chat.chatProblemId),
      )?.title,
  );

  const handlePrevClick = () => {
    dispatch(prevScreen());
  };

  const handleNextClick = () => {
    dispatch(nextScreen());
  };
  const screenTexts = [
    { middle: '목록', next: '답변' },
    { prev: '목록', middle: problemTitle, next: '힌트' },
    { prev: '답변', middle: '힌트' },
  ];
  const currentText = screenTexts[currentScreen];
  const screens = [
    <ProblemCoachingList />,
    <AIResponseViewer />,
    <FixedQuestion />,
  ];
  return (
    <div className="w-[400px] shadow-2xl">
      <div className="flex justify-between p-2 bg-slate-600 text-white text-base rounded-t-md w-full ">
        <div className="flex flex-1 items-center justify-start">
          {currentText.prev && (
            <>
              <Chevron onClick={handlePrevClick} />
              <span>{currentText.prev}</span>
            </>
          )}
        </div>
        {currentText.middle && (
          <div className="flex flex-1 justify-center">
            <span>{currentText.middle}</span>
          </div>
        )}

        <div className="flex flex-1 items-center justify-end">
          {currentText.next && (
            <>
              <span>{currentText.next}</span>
              <Chevron className="rotate-180" onClick={handleNextClick} />
            </>
          )}
        </div>
      </div>
      <div className="bg-gray-100 h-[300px] overflow-auto customTab-scrollbar ">
        {screens[currentScreen]}
      </div>
    </div>
  );
}
