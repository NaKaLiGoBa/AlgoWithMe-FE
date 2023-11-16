import React, { useState, useEffect } from 'react';
import MDEditor from '@uiw/react-md-editor';
import '@uiw/react-md-editor/markdown-editor.css';
import '@uiw/react-markdown-preview/markdown.css';
import CommentSection from '../CommentSection';
import ProblemListFooter from '../Problem/ProblemListFooter';
import usePaginationRange from '../../../../hooks/usePaginationRange';
import getCommentsBySolutionId from '../../../../utils/api/v1/comment/getCommentsBySolutionId';
import postCommentBySolutionId from '../../../../utils/api/v1/comment/postCommentBySolutionId';
import postCommentLikeBySolutionIdAndCommentId from '../../../../utils/api/v1/comment/postCommentLikeBySolutionIdAndCommentId';
import postReplyByCommentId from '../../../../utils/api/v1/Reply/postReplyByCommentId';

function CommentsSection({ solutionId }) {
  const [comments, setComments] = useState([]);
  const [page, setPage] = useState(1);
  const rowsPerPage = 5;
  const [sort, setSort] = useState('recent');
  const [newComment, setNewComment] = useState('');

  const { slice, range } = usePaginationRange(comments, page, rowsPerPage);

  useEffect(() => {
    const fetchComments = async () => {
      const params = {
        page,
        size: rowsPerPage,
        sort,
      };
      const response = await getCommentsBySolutionId(solutionId, params);
      if (response.success) {
        setComments(response.data.comments);
      } else {
        console.error('Failed to fetch comments:', response.error);
      }
    };
    if (solutionId) {
      fetchComments();
    }
  }, [page, rowsPerPage, sort, solutionId]);

  const handleSubmitComment = async (commentText = newComment) => {
    const content = commentText.trim();
    if (!content) return;

    try {
      const response = await postCommentBySolutionId(solutionId, { content });
      if (response.success) {
        setComments([...comments, response.data]);
        setNewComment('');
      } else {
        console.error(response.error);
      }
    } catch (error) {
      console.error('Failed to submit comment:', error);
    }
  };

  const handleLikeComment = async (commentId) => {
    const response = await postCommentLikeBySolutionIdAndCommentId(
      solutionId,
      commentId,
    );

    if (response.success) {
      setComments(
        comments.map((comment) => {
          if (comment.id === commentId) {
            return { ...comment, isLiked: response.data.isLike };
          }
          return comment;
        }),
      );
    } else {
      console.error(response.error);
    }
  };

  const handleReplySubmit = async (commentId, replyText) => {
    const trimmedReplyText = replyText.trim();
    if (!trimmedReplyText) return;

    try {
      const response = await postReplyByCommentId(commentId, {
        content: trimmedReplyText,
      });
      if (response.success) {
        setComments((currentComments) =>
          currentComments.map((comment) => {
            if (comment.id === commentId) {
              return {
                ...comment,
                replies: [...comment.replies, response.data],
              };
            }
            return comment;
          }),
        );
      } else {
        console.error(response.error);
      }
    } catch (error) {
      console.error('Failed to submit reply:', error);
    }
  };

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
          value={newComment}
          onChange={(val) => setNewComment(val)}
          preview="live"
        />
        <div className="mt-4 flex justify-end">
          <button
            className="bg-green-500 hover:bg-green-400 text-white px-4 py-2 rounded-lg"
            onClick={() => handleSubmitComment()}
          >
            Comment
          </button>
        </div>
      </div>

      <div className="bg-gray-900 ">
        <div className="space-y-4">
          {slice.map((commentData) => (
            <CommentSection
              key={commentData.id}
              commentData={commentData}
              handleLikeComment={() => handleLikeComment(commentData.id)}
              handleReplySubmit={handleReplySubmit}
            />
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
