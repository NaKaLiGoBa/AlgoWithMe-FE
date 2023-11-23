import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../../atoms/Tab/styles.css';

// api
import MDEditor from '@uiw/react-md-editor';
import getSolutionByProblemIdAndSolutionId from '../../../../utils/api/v1/solution/getSolutionByProblemIdAndSolutionId';

// component
import Button from '../../atoms/Input/Button';
import LikeButton from '../../atoms/Input/LikeButton';
import CommentsSection from '../CommentsSection';
import Avatar from '../../atoms/Avatar';

export default function index() {
  const [solutionData, setSolutionData] = useState(null);
  const { problemId, solutionId } = useParams();
  const [likes, setLikes] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    getSolutionByProblemIdAndSolutionId(problemId, solutionId).then(
      (response) => {
        setSolutionData(response.data);
        setIsLoaded(true);
      },
    );
  }, [problemId, solutionId]);

  const handleNavigate = () => {
    navigate(`/problems/${problemId}/solutions/${solutionId}/edit`, {
      state: { oldSolution: solutionData.solution },
    });
  };

  const handleDelete = async () => {};

  const handleLike = async () => {};
  if (!isLoaded) {
    return <div>Loading...</div>; // 로딩 중일 때 "Loading..." 메시지 표시
  }
  return (
    <div className="h-[99%] overflow-y-auto customTab-scrollbar">
      <div className="bg-white shadow rounded-b-lg p-6 ">
        <div className="bg-zinc-100 rounded-lg p-5 shadow-md shadow-zinc-400">
          <div className="flex justify-end">
            <Button
              className="rounded-lg p-2 mr-2.5 shadow-md shadow-blue-400"
              onClick={handleNavigate}
            >
              수정
            </Button>
            <Button
              className="bg-red-600 hover:bg-red-400 rounded-lg p-2 shadow-md shadow-red-400"
              onClick={handleDelete}
            >
              삭제
            </Button>
          </div>

          <div className="flex items-start space-x-4">
            <Avatar avatar={solutionData.author.avatar} />
            <div className="min-w-0 flex-1">
              <p className="text-2xl font-bold text-gray-900 truncate">
                {solutionData.solution.title}
              </p>
              <div className="flex mt-8">
                <p className="text-sm text-gray-500">
                  <a
                    href={`/users/${solutionData.author.nickname}`}
                    className="hover:underline"
                  >
                    {solutionData.author.nickname}
                  </a>
                </p>
                <p className="text-sm text-gray-500 ml-5">
                  {new Date(
                    solutionData.solution.createdAt,
                  ).toLocaleDateString()}
                </p>
              </div>
              <div className="flex items-center mt-6">
                <LikeButton onClick={handleLike} isLiked={isLiked} />
                <span className="ml-1 text-red-500 ">{likes}</span>
                <p className="text-sm text-gray-500">
                  <span className="mr-2 ml-5">언어:</span>
                  {solutionData.solution.languages.map((language) => (
                    <span
                      key={language}
                      className="inline-block bg-slate-300 rounded-full px-2.5 py-1 font-semibold text-gray-700 mr-2 mb-1"
                    >
                      {language}
                    </span>
                  ))}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-between items-center my-2">
          <div className="mt-1 h-px w-full bg-gray-400" />
        </div>
        {/* Viewer */}
        <div className="markdown-viewer bg-white p-6 rounded-lg shadow-md shadow-zinc-400">
          <MDEditor.Markdown source={solutionData?.solution.content} />
        </div>
        <div className="mt-4 rounded-lg shadow-md shadow-zinc-400">
          <CommentsSection solutionId={solutionData.solution.id} />
        </div>
      </div>
    </div>
  );
}
