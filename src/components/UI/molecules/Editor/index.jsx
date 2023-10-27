import React, { useState, useEffect } from 'react';
import Editor from '@monaco-editor/react';
import DropdownMenu from '../../atoms/Input/Dropdown';

function Index({ defaultCodes }) {
  const availableLanguages = Object.keys(defaultCodes);
  const [editorState, setEditorState] = useState({
    ...defaultCodes,
    currentLanguage: availableLanguages[0],
  });

  useEffect(() => {
    setEditorState((prev) => ({
      ...prev,
      ...defaultCodes,
    }));
  }, [defaultCodes]);

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
