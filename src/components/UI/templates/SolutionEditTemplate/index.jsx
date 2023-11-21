import React, { useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import MdEditor from '../../molecules/MdEditor';
import Button from '../../atoms/Input/Button';
import Input from '../../atoms/Input/Input';
import Header from '../../molecules/Navigation/Header';
import postSolutionByProblemId from '../../../../utils/api/v1/solution/postSolutionByProblemId';

// const
import contentTemplate from './contentTemplate';

const index = () => {
  const navigate = useNavigate();
  const { problemId } = useParams();
  const [title, setTitle] = useState();

  // set content from editor code
  const editorLocalState = JSON.parse(
    localStorage.getItem(`editorState_${problemId}`),
  );
  const code = editorLocalState[editorLocalState.currentLanguage];
  const [content, setContent] = useState(contentTemplate(code));

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleClickSubmit = () => {
    if (!title || title.trim() === '') {
      alert('제목을 입력해주세요');
      return;
    }

    const editorState = JSON.parse(
      localStorage.getItem(`editorState_${problemId}`),
    );

    const requestData = {
      title,
      content,
      languages: [editorState.currentLanguage],
    };
    postSolutionByProblemId(problemId, requestData).then(() =>
      navigate(`/problems/${problemId}`),
    );
  };

  return (
    <>
      <Header />
      <div className="h-[calc(100vh-70px)] flex flex-col items-center justify-center">
        <div className="bg-white p-5 rounded-xl shadow-2xl">
          <div className="flex flex-row justify-between items-baseline w-[1200px] mb-4">
            <div className="w-3/5">
              <Input
                className="h-8 bg-gray-300 border-transparent focus:outline-none"
                placeholder="Enter your title"
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
          <MdEditor content={content} setContent={setContent} />
        </div>
      </div>
    </>
  );
};

export default index;
