import React from 'react';
import Close from '../../atoms/Icon/Close';
import QuestionCheckbox from './QuestionCheckbox';

export default function index({ handleChatToggle }) {
  return (
    <div className="">
      <Close onClick={handleChatToggle} className="" />
      <QuestionCheckbox />
    </div>
  );
}
