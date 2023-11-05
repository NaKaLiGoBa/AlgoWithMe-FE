import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setActiveTab, updateTabContent } from '../../../../store/tabState';
import MDEditor from '@uiw/react-md-editor';
import '@uiw/react-md-editor/markdown-editor.css';
import '@uiw/react-markdown-preview/markdown.css';

export default function SolutionTest() {
  const activeTab = useSelector((state) => state.tabs.activeTab);
  const tabs = useSelector((state) => state.tabs.tabs);
  const dispatch = useDispatch();
  const [markdownContent, setMarkdownContent] = useState(
    activeTab ? activeTab.content : '',
  );
  useEffect(() => {
    setMarkdownContent(activeTab ? activeTab.content : '');
  }, [activeTab]);

  const handleTabClick = (tab) => {
    dispatch(setActiveTab(tab));
  };
  const onMarkdownChange = (content) => {
    setMarkdownContent(content);
    if (activeTab) {
      dispatch(updateTabContent({ id: activeTab.id, content }));
    }
  };

  return (
    <div className="SolutionTest">
      <ul className="tabs">
        {tabs.map((tab, index) => (
          <li
            key={tab.id}
            className={tab.id === activeTab.id ? 'active' : ''}
            onClick={() => handleTabClick(tab)}
          >
            {tab.name}
          </li>
        ))}
      </ul>
      {/* Editor 넣으면 되는 공간, 임시로 넣어둠 */}
      <MDEditor value={markdownContent} onChange={onMarkdownChange} />
      {/* Viewer */}
      <div className="markdown-viewer">
        <MDEditor.Markdown source={markdownContent} />
      </div>
    </div>
  );
}
