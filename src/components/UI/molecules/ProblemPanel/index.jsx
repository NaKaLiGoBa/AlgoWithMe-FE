import React from 'react';

const index = ({
  number,
  title,
  difficulty,
  status,
  acceptance,
  description,
  tags,
}) => (
  <div className="w-[40%] m-2 bg-white rounded-xl max-h-screen overflow-y-auto">
    <div className="m-4">
      <h2>{`${number}. ${title}`}</h2>
    </div>
    <div className="flex flex-row gap-4 m-4">
      <p>{difficulty}</p>
      <p>{status}</p>
      <p>{`정답률: ${acceptance}`}</p>
    </div>
    <div className="flex flex-col gap-4 m-4">
      <h3>설명</h3>
      <p>{description}</p>
    </div>
    <div className="flex flex-col gap-4 m-4">
      <h3>입력</h3>
      <p>placeholder</p>
    </div>
    <div className="flex flex-col gap-4 m-4">
      <h3>출력</h3>
      <p>placeholder</p>
    </div>
  </div>
);

export default index;
