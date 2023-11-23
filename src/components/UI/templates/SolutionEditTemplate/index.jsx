import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate, useLocation } from 'react-router-dom';
import MdEditor from '../../molecules/MdEditor';
import Button from '../../atoms/Input/Button';
import Input from '../../atoms/Input/Input';
import Header from '../../molecules/Navigation/Header';
import postSolutionByProblemId from '../../../../utils/api/v1/solution/postSolutionByProblemId';
import putSolutionByProblemIdAndSolutionId from '../../../../utils/api/v1/solution/putSolutionByProblemIdAndSolutionId';

// const
import contentTemplate from './contentTemplate';

const index = () => {
  // const, state, Hooks
  const location = useLocation();
  const navigate = useNavigate();
  const { problemId, solutionId } = useParams();
  const [title, setTitle] = useState();

  const editorLocalState = JSON.parse(
    localStorage.getItem(`editorState_${problemId}`),
  );
  const code = editorLocalState[editorLocalState.currentLanguage];
  const [content, setContent] = useState(contentTemplate(code));

  useEffect(() => {
    if (solutionId === 'new') return;
    const { oldSolution } = location.state;
    setTitle(oldSolution.title);
    setContent(oldSolution.content);
  }, []);

  // handler
  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleClickSubmit = () => {
    if (!title || title.trim() === '') {
      alert('제목을 입력해주세요');
      return;
    }

    if (solutionId === 'new') {
      const editorState = JSON.parse(
        localStorage.getItem(`editorState_${problemId}`),
      );

      const requestData = {
        title,
        content,
        languages: [editorState.currentLanguage],
      };
      postSolutionByProblemId(problemId, requestData).then(() => {
        navigate(`/problems/${problemId}/solutions`);
      });
    } else {
      const requestData = {
        title,
        content,
        languages: location.state.oldSolution.languages,
      };
      putSolutionByProblemIdAndSolutionId(
        problemId,
        solutionId,
        requestData,
      ).then(() => navigate(`/problems/${problemId}/solutions`));
    }
  };

  // jsx
  return (
    <>
      <Header />
      <div className="h-[calc(100vh-70px)] flex flex-col items-center justify-center">
        <div className="bg-white p-5 rounded-xl shadow-2xl">
          <div className="flex flex-row justify-between items-baseline w-[1200px] mb-4">
            <div className="w-3/5">
              <Input
                className="h-10 bg-white border-[1px] focus:outline-none shadow-none"
                placeholder="제목을 입력해주세요"
                value={title}
                onChange={handleTitleChange}
              />
            </div>
            <div className="flex flex-row gap-4">
              <Link to={`/problems/${problemId}`}>
                <Button className="bg-gray-400 px-4 rounded-lg">취소</Button>
              </Link>
              <Button
                className="bg-green-500 px-4 rounded-lg"
                onClick={handleClickSubmit}
              >
                완료
              </Button>
            </div>
          </div>
          <div className="markdown-viewer bg-white" data-color-mode="light">
            <MdEditor content={content} setContent={setContent} />
          </div>
        </div>
      </div>
    </>
  );
};

export default index;
