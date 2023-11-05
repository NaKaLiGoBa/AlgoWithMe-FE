import React from 'react';
import Text from '../../atoms/Text/Text';

export default function index({ avatar, nickname, title, onClick }) {
  return (
    <div className="h-[400px] flex mt-4 border-b-2 mb-6 ">
      <div className="bg-gray-200 w-7 h-7 rounded-full text-center mr-4 ">
        {avatar}
      </div>
      <div>
        <Text>{nickname}</Text>
        <button type="button" onClick={onClick}>
          <h2 className="text-lg font-bold">{title}</h2>
        </button>
      </div>
    </div>
  );
}
