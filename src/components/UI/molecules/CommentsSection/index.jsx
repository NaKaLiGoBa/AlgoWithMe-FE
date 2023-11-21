import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import MDEditor from '@uiw/react-md-editor';
import { selectActiveSolutionId } from '../../../../store/SolutionsSlice';
import { selectUser } from '../../../../store/userSlice';
import '@uiw/react-md-editor/markdown-editor.css';
import CommentSection from '../CommentSection';
import ProblemListFooter from '../Problem/ProblemListFooter';
import usePaginationRange from '../../../../hooks/usePaginationRange';
import getCommentsBySolutionId from '../../../../utils/api/v1/comment/getCommentsBySolutionId';
import postCommentBySolutionId from '../../../../utils/api/v1/comment/postCommentBySolutionId';
import postCommentLikeBySolutionIdAndCommentId from '../../../../utils/api/v1/comment/postCommentLikeBySolutionIdAndCommentId';
import postReplyByCommentId from '../../../../utils/api/v1/Reply/postReplyByCommentId';

function CommentsSection() {
  const [comments, setComments] = useState([]);
  const [page, setPage] = useState(1);
  const rowsPerPage = 5;
  const [sort, setSort] = useState('recent');
  const [newComment, setNewComment] = useState('');
  const solutionId = useSelector(selectActiveSolutionId);
  const currentUser = useSelector(selectUser);

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
        console.log('Comments: ', response.data.comments);
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
    // solutionId 유효성 검사 강화(Id가 0이어도 보이게)
    if (solutionId === undefined || solutionId === null) {
      console.error('No solutionId provided');
      return;
    }
    try {
      console.log('Submitting comment:', content); // 입력된 댓글 내용 확인
      const response = await postCommentBySolutionId(solutionId, { content });
      if (response.success) {
        // 추출된 Location 헤더에서 실제 solution ID 가져오기
        const solutionLocation = response.headers['location'];
        const createdSolutionId = solutionLocation.substring(solutionLocation.lastIndexOf('/') + 1);
  
        const newCommentData = {
          id: createdSolutionId, // 서버에서 반환받은 실제 ID 사용
          content,
          likes: 0,
          isLiked: false,
          solutionId,
          username: currentUser.username,
          avatar: currentUser.avatar,
        };
        setComments([...comments, newCommentData]);
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

  const handleDeleteComment = (commentId) => {
    setComments((currentComments) =>
      currentComments.filter((comment) => comment.id !== commentId),
    );
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
            type="button"
          >
            Comment
          </button>
        </div>
      </div>

      <div className="bg-gray-900 ">
        <div className="space-y-4">
          {comments.map((commentData) => (
            <CommentSection
              key={commentData.id}
              commentData={commentData}
              handleLikeComment={() => handleLikeComment(commentData.id)}
              handleReplySubmit={handleReplySubmit}
              currentUser={currentUser}
              onDelete={() => handleDeleteComment(commentData.id)}
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
