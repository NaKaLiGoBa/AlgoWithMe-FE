import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import MDEditor from '@uiw/react-md-editor';
import '@uiw/react-md-editor/markdown-editor.css';
import '@uiw/react-markdown-preview/markdown.css';
import {
  setActiveTab,
  removeTab,
  updateTabContent,
} from '../../../../store/tabState';
import {
  fetchSolution,
  updateSolution,
  deleteSolution,
} from '../../../../utils/fetchSolution';
import Button from '../../atoms/Input/Button';

export default function SolutionTest() {
  const activeTab = useSelector((state) => state.tabs.activeTab);
  const tabs = useSelector((state) => state.tabs.tabs);
  const dispatch = useDispatch();
  const [activeSolution, setActiveSolution] = useState(null);
  const navigate = useNavigate();
  const authToken = localStorage.getItem('authToken');

  useEffect(() => {
    const fetchSolutionData = async () => {
      try {
        const solutionData = await fetchSolution(
          0,
          0,
        );
        setActiveSolution(solutionData);
      } catch (error) {
        console.error('Error fetching solution data:', error);
      }
    };
    if (activeTab) {
      fetchSolutionData();
    }
  }, [activeTab]);

  const handleTabClick = (tab) => {
    dispatch(setActiveTab(tab));
  };

  const handleUpdate = async () => {
    if (window.confirm('정말로 수정하시겠습니까?')) {
      navigate(
        `/edit/${activeTab.problemId}/solution/${activeTab.solutionId}/edit`,
      ); // 그냥 이동?
    }
  };

  const handleDelete = async () => {
    if (window.confirm('정말로 삭제하시겠습니까?')) {
      try {
        const response = await deleteSolution(
          activeTab.problemId,
          activeTab.solutionId,
          authToken,
        );
        alert('풀이 글 삭제 완료');
        console.log('Delete successful', response);
        // 삭제 후 행동
        dispatch(removeTab({ id: activeTab.id }));
        navigate('/problems/:problemId');
      } catch (error) {
        console.error('Error deleting solution:', error);
      }
    }
  };

  return (
    <div className="SolutionTest">
      <ul className="tabs">
        {tabs.map((tab) => (
          <li
            key={tab.id}
            className={tab.id === activeTab.id ? 'active' : ''}
            onClick={() => handleTabClick(tab)}
          ></li>
        ))}
      </ul>
      {/* 게시글 데이터가 로드되었을 때만 내용을 표시 */}
      {activeSolution && (
        <div className="bg-gray-200 shadow rounded-b-lg p-6">
          <div className="flex justify-end">
            <Button className="rounded-lg p-2 mr-2.5" onClick={handleUpdate}>
              수정
            </Button>
            <Button
              className="bg-red-600 hover:bg-red-400 rounded-lg p-2"
              onClick={handleDelete}
            >
              삭제
            </Button>
          </div>

          <div className="flex items-start space-x-4">
            <img
              className="w-16 h-16 rounded-full object-cover"
              src={activeSolution.author.avatar}
              alt={`${activeSolution.author.nickname}'s avatar`}
            />
            <div className="min-w-0 flex-1">
              <p className="text-xl font-bold text-gray-900 truncate">
                {activeSolution.solution.title}
              </p>
              <div className="flex mt-4">
                <p className="text-sm text-gray-500">
                  <a
                    href={`/users/${activeSolution.author.nickname}`}
                    className="hover:underline"
                  >
                    {activeSolution.author.nickname}
                  </a>
                </p>
                <p className="text-sm text-gray-500 ml-5">
                  {new Date(
                    activeSolution.solution.createdAt,
                  ).toLocaleDateString()}
                </p>
              </div>
              <p className="mt-2.5 text-sm text-gray-500">
                <span className="mr-2">언어:</span>
                {activeSolution.solution.languages.map((language) => (
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
      )}
      <div className="flex justify-between items-center my-2">
        <div className="mt-1 h-px w-full bg-gray-400" />
      </div>
      {/* Viewer */}
      <div className="markdown-viewer bg-white p-6">
        <MDEditor.Markdown source={activeSolution?.solution.content} />
      </div>
    </div>
  );
}
