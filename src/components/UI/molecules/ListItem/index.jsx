import React from 'react';
import Text from '../../atoms/Text/Text';

export default function index({ avatar, nickname, title, onClick }) {
  return (
    <div className="h-[400px]">
      <div>{avatar}</div>
      <Text>{nickname}</Text>
      <button type="button" onClick={onClick}>
        <h2>{title}</h2>
      </button>
    </div>
  );
}
