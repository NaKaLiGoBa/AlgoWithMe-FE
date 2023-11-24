import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import Editor from '@monaco-editor/react';
import DropdownMenu from '../../atoms/Input/Dropdown';
import CreateDocs from '../../atoms/Icon/CreateDocs';
import Button from '../../atoms/Input/Button';

function Index() {
  const { defaultCodes, status } = useSelector((state) => state.problem);
  const { problemId } = useParams();
  const availableLanguages = Object.keys(defaultCodes);
  const navigate = useNavigate();

  const handleSolutionCreate = () => {
    if (status !== '성공') {
      alert('솔루션을 작성하려면 문제 제출 후 성공해야합니다.');
      return;
    }
    navigate(`/problems/${problemId}/solutions/new/edit`, {});
  };

  const storedState = JSON.parse(
    localStorage.getItem(`editorState_${problemId}`),
  );
  const initialEditorState = storedState || {
    ...defaultCodes,
    currentLanguage: availableLanguages[0],
  };

  const [editorState, setEditorState] = useState(initialEditorState);

  useEffect(() => {
    localStorage.setItem(
      `editorState_${problemId}`,
      JSON.stringify(editorState),
    );
  }, [editorState, problemId]);

  const handleSelectLanguage = (selectedLanguage) => {
    setEditorState((prev) => ({ ...prev, currentLanguage: selectedLanguage }));
  };

  const handleCodeChange = (code) => {
    setEditorState((prev) => ({
      ...prev,
      [prev.currentLanguage]: code,
    }));
  };

  return (
    <div className="flex flex-col h-[calc(100%-300px)]">
      <div className="flex flex-row items-center w-[100%]">
        <div className="mx-4 my-2">
          <DropdownMenu
            title={editorState.currentLanguage}
            list={availableLanguages}
            handleSelectItem={handleSelectLanguage}
          />
        </div>
        <Button
          type="button"
          className="relative w-[100px] rounded-lg text-white bg-gray-400 hover:bg-gray-500"
          onClick={handleSolutionCreate}
        >
          <CreateDocs />
          <p>솔루션</p>
          <span className="absolute right-[-4px] top-[-4px] w-3 h-3 rounded-full" />
        </Button>
      </div>

      <div className="mx-4 grow">
        <Editor
          key={editorState.currentLanguage}
          width="100%"
          height="100%"
          language={editorState.currentLanguage}
          value={editorState[editorState.currentLanguage]}
          onChange={handleCodeChange}
          options={{
            fontSize: 15,
            minimap: { enabled: false },
            scrollbar: {
              vertical: 'auto',
              horizontal: 'auto',
            },
          }}
        />
      </div>
    </div>
  );
}

export default Index;
