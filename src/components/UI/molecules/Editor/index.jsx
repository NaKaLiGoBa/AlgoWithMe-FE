import React, { useState, useEffect } from 'react';
import Editor from '@monaco-editor/react';
import DropdownMenu from '../../atoms/Input/Dropdown';

function Index({ defaultCodes, problemId }) {
  const availableLanguages = Object.keys(defaultCodes);

  // 컴포넌트가 마운트될 때 로컬 스토리지 값을 체크하고, 없으면 defaultCodes로 초기화
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
    <div className="flex flex-col h-[400px] p-2 m-2 bg-white rounded-xl ">
      <div className="mx-4 my-2">
        <DropdownMenu
          title={editorState.currentLanguage}
          list={availableLanguages}
          handleSelectItem={handleSelectLanguage}
        />
      </div>
      <div className="mx-4 my-2 grow">
        <Editor
          key={editorState.currentLanguage}
          width="100%"
          height="300px"
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
