import React, { useState } from 'react';
import MDEditor from '@uiw/react-md-editor';
import '@uiw/react-md-editor/markdown-editor.css';
import '@uiw/react-markdown-preview/markdown.css';
import CommentSection from '../CommentSection';
import ProblemListFooter from '../Problem/ProblemListFooter';
import usePaginationRange from '../../../../hooks/usePaginationRange';

function CommentsSection() {
  const [value, setValue] = useState('');
  const [page, setPage] = useState(1);
  const rowsPerPage = 5;

  const commentsData = [
    {
      id: 'c1',
      username: 'Goorm1',
      timestamp: 'Nov 10, 2023',
      content: '훌륭한 풀이.',
      likes: 456,
      avatar: '/path/to/goorm1/avatar.jpg',
      replies: [
        {
          id: 'r1',
          username: '@HM1',
          timestamp: 'a minute ago',
          content: 'Good :)',
        },
        {
          id: 'r2',
          username: '@HM2',
          timestamp: 'Nov 11, 2023',
          content: '가나다라마ㅂ',
        },
      ],
    },
    {
      id: 'c2',
      username: 'Goorm2',
      timestamp: 'Nov 11, 2023',
      content: '훌륭한 풀이2',
      likes: 123,
      avatar: '/path/to/goorm2/avatar.jpg',
      replies: [
        {
          id: 'r1',
          username: '@HM3',
          timestamp: '11 minute ago',
          content: '3333333333',
        },
        {
          id: 'r2',
          username: '@HM4',
          timestamp: 'Nov 11, 2023',
          content: '사아자차카타ㅍ',
        },
      ],
    },
    {
      id: 'c2',
      username: 'Goorm3',
      timestamp: 'Nov 11, 2023',
      content: '훌륭한 풀이3',
      likes: 123,
      avatar: '/path/to/goorm2/avatar.jpg',
      replies: [
        {
          id: 'r1',
          username: '@HM3',
          timestamp: '11 minute ago',
          content: '3333333333',
        },
        {
          id: 'r2',
          username: '@HM4',
          timestamp: 'Nov 11, 2023',
          content: '사아자차카타ㅍ',
        },
      ],
    },
    {
      id: 'c2',
      username: 'Goorm4',
      timestamp: 'Nov 11, 2023',
      content: '훌륭한 풀이4',
      likes: 123,
      avatar: '/path/to/goorm2/avatar.jpg',
      replies: [
        {
          id: 'r1',
          username: '@HM3',
          timestamp: '11 minute ago',
          content: '3333333333',
        },
        {
          id: 'r2',
          username: '@HM4',
          timestamp: 'Nov 11, 2023',
          content: '사아자차카타ㅍ',
        },
      ],
    },
    {
      id: 'c2',
      username: 'Goorm5',
      timestamp: 'Nov 11, 2023',
      content: '훌륭한 풀이5',
      likes: 123,
      avatar: '/path/to/goorm2/avatar.jpg',
      replies: [
        {
          id: 'r1',
          username: '@HM3',
          timestamp: '11 minute ago',
          content: '3333333333',
        },
        {
          id: 'r2',
          username: '@HM4',
          timestamp: 'Nov 11, 2023',
          content: '사아자차카타ㅍ',
        },
      ],
    },
    {
      id: 'c2',
      username: 'Goorm6',
      timestamp: 'Nov 11, 2023',
      content: '훌륭한 풀이6',
      likes: 123,
      avatar: '/path/to/goorm2/avatar.jpg',
      replies: [
        {
          id: 'r1',
          username: '@HM3',
          timestamp: '11 minute ago',
          content: '3333333333',
        },
        {
          id: 'r2',
          username: '@HM4',
          timestamp: 'Nov 11, 2023',
          content: '사아자차카타ㅍ',
        },
      ],
    },
    {
      id: 'c2',
      username: 'Goorm7',
      timestamp: 'Nov 11, 2023',
      content: '훌륭한 풀이7',
      likes: 123,
      avatar: '/path/to/goorm2/avatar.jpg',
      replies: [
        {
          id: 'r1',
          username: '@HM3',
          timestamp: '11 minute ago',
          content: '3333333333',
        },
        {
          id: 'r2',
          username: '@HM4',
          timestamp: 'Nov 11, 2023',
          content: '사아자차카타ㅍ',
        },
      ],
    },
  ];

  const { slice, range } = usePaginationRange(commentsData, page, rowsPerPage);

  return (
    <div className="bg-gray-900 p-8 font-sans text-white">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-white font-bold text-lg">Comments</h2>
        <div>
          <label htmlFor="sort-comments" className="text-gray-400 mr-2">
            Sort by:
          </label>
          <select
            id="sort-comments"
            className="bg-gray-700 text-white rounded-lg p-2"
          >
            <option>Best</option>
            <option>Most Votes</option>
            <option>Newest to Oldest</option>
            <option>Oldest to Newest</option>
          </select>
        </div>
      </div>

      <div className="bg-gray-800 p-4 rounded-lg mb-9">
        <MDEditor
          value={value}
          onChange={(val) => setValue(val)}
          preview="live"
        />
        <div className="mt-4 flex justify-end">
          <button
            className="bg-green-500 hover:bg-green-400 text-white px-4 py-2 rounded-lg"
            onClick={() => {
              /* 댓글 제출 로직 */
            }}
          >
            Comment
          </button>
        </div>
      </div>

      <div className="bg-gray-900 ">
        <div className="space-y-4">
        {slice.map((commentData) => (
            <CommentSection key={commentData.id} commentData={commentData} />
          ))}
        </div>
      </div>

      {/* 페이지네이션 컴포넌트 */}
      <ProblemListFooter
        range={range}
        setPage={setPage}
        page={page}
        slice={slice}
      />
    </div>
  );
}

export default CommentsSection;
