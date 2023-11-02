import React from 'react';
import Text from '../../atoms/Text/Text';

export default function index({ id, avatar, nickname, title, onClick }) {
  return (
    <div key={id}>
      <div>{avatar}</div>
      <Text>{nickname}</Text>
      <button type="button" onClick={onClick}>
        <h2>{title}</h2>
      </button>
    </div>
  );
}
