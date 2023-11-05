import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import MDEditor from '@uiw/react-md-editor';
import '@uiw/react-md-editor/markdown-editor.css';
import '@uiw/react-markdown-preview/markdown.css';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { setActiveTab, updateTabContent } from '../../../../store/tabState';
import fetchSolution from '../../../../utils/fetchSolution';

export default function SolutionTest() {
  const activeTab = useSelector((state) => state.tabs.activeTab);
  const tabs = useSelector((state) => state.tabs.tabs);
  const dispatch = useDispatch();
  const [activeSolution, setActiveSolution] = useState(null);

  // 테스트
  // axios 인스턴스 생성
  const axiosInstance = axios.create();
  // Mock Adapter 인스턴스 생성
  const mock = new MockAdapter(axiosInstance);
  // 가짜 응답 데이터 정의
  const mockSolutionData = {
    solution: {
      title: '제목 테스트',
      content: '**테스트** 입니다!',
      createdAt: new Date().toISOString(),
      languages: ['JavaScript', 'Python'],
    },
    author: {
      nickname: '닉네임테스트',
      avatar: '123',
    },
  };
  // Mock 설정: problemId와 solutionId와 관계없이 모든 GET 요청을 가로채서 가짜 데이터로 응답
  mock.onGet(/\/problems\/.*\/solutions\/.*/).reply(200, mockSolutionData);
  // `fetchSolution` 함수를 Mock Adapter를 사용하는 axios 인스턴스로 업데이트
  const fetchSolution = async (problemId, solutionId) => {
    const response = await axiosInstance.get(
      `/problems/${problemId}/solutions/${solutionId}`,
    );
    return response.data;
  };

  useEffect(() => {
    const fetchSolutionData = async () => {
      try {
        const solutionData = await fetchSolution(
          activeTab.problemId,
          activeTab.solutionId,
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
              <p className="mt-2 mb-1 text-sm text-gray-500">
                <span className="mr-2">언어:</span>
                {activeSolution.solution.languages.map((language) => (
                  <span
                    key={language}
                    className="inline-block bg-slate-300 rounded-full px-3 py-1 font-semibold text-gray-700 mr-2 mb-2"
                  >
                    {language}
                  </span>
                ))}
              </p>
            </div>
          </div>
          {/* Editor 넣으면 되는 공간, 임시로 넣어둠 */}
          <MDEditor value={activeSolution.solution.content} />
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
