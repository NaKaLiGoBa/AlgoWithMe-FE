import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import MDEditor from '@uiw/react-md-editor';
import Link from '../../atoms/Text/Link';
import Plus from '../../atoms/Icon/Plus';
import '../../atoms/Tab/styles.css';
import { formatPercentage } from '../../../../utils/utils';
import { getDifficulty } from '../Problem/ProblemList';

const index = ({ className }) => {
  const number = useSelector((state) => state.problem.number);
  const title = useSelector((state) => state.problem.title);
  const difficulty = useSelector((state) => state.problem.difficulty);
  const status = useSelector((state) => state.problem.status);
  const acceptance = useSelector((state) => state.problem.acceptance);
  const description = useSelector((state) => state.problem.description);
  const tags = useSelector((state) => state.problem.tags);
  const { problemId } = useParams();
  const quizzes = useSelector((state) => state.quiz.quizzes);

  return (
    <div
      className={`bg-white rounded-xl h-[99%] overflow-y-auto ${className} customTab-scrollbar`}
    >
      <div className="m-4 flex">
        <h2 className="items-center flex ">{`${number}. ${title}`}</h2>
        {quizzes.length && (
          <Link
            to={`/problems/${problemId}/quizzes`}
            className="ml-8 bg-[#63B758] text-white pl-2 pr-4 py-1 rounded-md flex"
          >
            <Plus />
            미니퀴즈
          </Link>
        )}
      </div>
      <div className="flex flex-row gap-4 m-4">
        {getDifficulty(difficulty)}
        <p>{status}</p>
        <p>{`정답률: ${formatPercentage(acceptance)}%`}</p>
      </div>
      <div className="flex flex-col m-4">
        {/* <div className="flex flex-row gap-1">
          {tags.map((tag) => (
            <div>
              <p className="py-1 px-2 text-xs bg-slate-600 text-white rounded-xl">
                {tag}
              </p>
            </div>
          ))}
        </div> */}
      </div>
      <div className="markdown-viewer bg-white p-6" data-color-mode="light">
        <MDEditor.Markdown source={description} />
      </div>
    </div>
  );
};

export default index;
