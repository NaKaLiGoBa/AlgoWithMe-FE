import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import MDEditor from '@uiw/react-md-editor';
import Link from '../../atoms/Text/Link';
import Plus from '../../atoms/Icon/Plus';

const index = () => {
  const number = useSelector((state) => state.problem.number);
  const title = useSelector((state) => state.problem.title);
  const difficulty = useSelector((state) => state.problem.difficulty);
  const status = useSelector((state) => state.problem.status);
  const acceptance = useSelector((state) => state.problem.acceptance);
  const description = useSelector((state) => state.problem.description);
  const tags = useSelector((state) => state.problem.tags);
  const { problemId } = useParams();

  return (
    <div className="bg-white rounded-xl h-[100%] overflow-y-auto">
      <div className="m-4 flex">
        <h2 className="items-center flex ">{`${number}. ${title}`}</h2>
        <Link
          to={`/problems/${problemId}/quizzes`}
          className="ml-8 bg-[#63B758] text-white px-4 py-1 rounded-md flex"
        >
          <Plus />
          미니퀴즈
        </Link>
      </div>
      <div className="flex flex-row gap-4 m-4">
        <p>{difficulty}</p>
        <p>{status}</p>
        <p>{`정답률: ${acceptance}`}</p>
      </div>
      <div className="flex flex-col gap-4">
        <div className="markdown-viewer bg-white p-6" data-color-mode="light">
          <MDEditor.Markdown source={description} />
        </div>
      </div>
      <div className="flex flex-col gap-4 m-4">
        <h3>태그</h3>
        <div className="flex flex-row gap-4">
          {tags.map(({ tag, index }) => (
            <div key={index}>
              <p className="m-1 py-1 px-2 bg-slate-600 text-white rounded-xl">
                {tag}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default index;
