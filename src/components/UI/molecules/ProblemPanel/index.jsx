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
  <div className="bg-white rounded-xl h-screen overflow-y-auto">
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
    <div className="flex flex-col gap-4 m-4">
      <h3>태그</h3>
      <div className="flex flex-row gap-4">
        {tags.map((tag) => (
          <p className="m-1 py-1 px-2 bg-slate-600 text-white rounded-xl">
            {tag}
          </p>
        ))}
      </div>
    </div>
  </div>
);

export default index;
