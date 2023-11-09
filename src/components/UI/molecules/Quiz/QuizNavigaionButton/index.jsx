import React from 'react';
import Button from '../../../atoms/Input/Button';

export default function index() {
  return (
    <div>
      <Button className="p-3 rounded-md !bg-[#D9D9D9] "> 이전문제</Button>
      <Button className="p-3 rounded-md"> 정답확인</Button>
      <Button className="p-3 rounded-md !bg-[#63B758]">다음문제</Button>
      <Button className="p-3 rounded-md  !bg-[#63B758]"> 문제풀기</Button>
    </div>
  );
}
