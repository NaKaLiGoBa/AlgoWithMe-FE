import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import LikeButton from '../../atoms/Input/LikeButton';
import RepliesToggleButton from '../../atoms/Toggle/RepliesToggleButton';
import ReplyButton from '../../atoms/Input/ReplyButton';
import Comment from '../../atoms/Input/Comment';
import CommentInput from '../../atoms/Input/CommentInput';
import Delete from '../../atoms/Icon/Delete';
import Edit from '../../atoms/Icon/Edit';
import getReplyByCommentId from '../../../../utils/api/v1/Reply/getReplyByCommentId';
import postReplyByCommentId from '../../../../utils/api/v1/Reply/postReplyByCommentId';
import putReplyLikeByCommentIdAndReplyId from '../../../../utils/api/v1/Reply/putReplyLikeByCommentIdAndReplyId';
import deleteReplyByCommentIdAndReplyId from '../../../../utils/api/v1/Reply/deleteReplyByCommentIdAndReplyId';
import putReplyByCommentIdAndReplyID from '../../../../utils/api/v1/Reply/putReplyByCommentIdAndReplyID';
import deleteCommentBySolutionIdAndCommentId from '../../../../utils/api/v1/comment/deleteCommentBySolutionIdAndCommentId';
import putCommentLikeBySolutionIdAndCommentId from '../../../../utils/api/v1/comment/putCommentLikeBySolutionIdAndCommentId';
import { selectUser } from '../../../../store/userSlice';
import putCommentBySolutionIdAndCommentId from '../../../../utils/api/v1/comment/putCommentBySolutionIdAndCommentId';
import { setActiveCommentId } from '../../../../store/commentSlice';
import Avatar from '../../atoms/Avatar';

function CommentSection({ commentData, onDelete, onLikeUpdate }) {
  const [areRepliesVisible, setAreRepliesVisible] = useState(false);
  const [replies, setReplies] = useState([]);
  const [isReplying, setIsReplying] = useState(false); // 댓글 입력 상태
  const [isHovering, setIsHovering] = useState(false);
  const currentUser = useSelector(selectUser);
  const [isEditing, setIsEditing] = useState(false); // 댓글 수정 상태
  const [editedContent, setEditedContent] = useState(
    commentData.comment.content,
  ); // 수정할 댓글 내용
  const [editingReplyId, setEditingReplyId] = useState(null); // 수정 중인 대댓글 ID
  const [editedReplyContent, setEditedReplyContent] = useState(''); // 수정할 대댓글 내용
  const [likes, setLikes] = useState(commentData.comment.likeCount || 0);
  const [isLiked, setIsLiked] = useState(commentData.comment.like || false);

  const dispatch = useDispatch();

  // 댓글 ID 설정
  const handleCommentSelect = () => {
    dispatch(setActiveCommentId(commentData.comment.id));
  };
  const canEditComment = currentUser.nickname === commentData.author.nickname;

  const fetchReplies = async () => {
    if (areRepliesVisible && commentData.comment.id) {
      try {
        const response = await getReplyByCommentId(commentData.comment.id);
        if (response.success) {
          setReplies(response.data.replies || []);
        } else {
          console.error('Failed to fetch replies:', response.error);
        }
      } catch (error) {
        console.error('Failed to fetch replies:', error);
      }
    }
  };

  useEffect(() => {
    console.log('Received comment data:', commentData);
    fetchReplies();
    setIsLiked(commentData.comment.like);
    setLikes(commentData.comment.likeCount);
    const storedLikeStatus = JSON.parse(
      localStorage.getItem(`likedComment-${commentData.comment.id}`),
    );
    if (storedLikeStatus !== null) {
      setIsLiked(storedLikeStatus);
    }
  }, [areRepliesVisible, commentData]);

  const toggleReplyInput = () => {
    setIsReplying(!isReplying); // 댓글 입력 상태 토글
  };

  const handleReplySubmit = async (replyText) => {
    handleCommentSelect();
    if (!replyText.trim()) return;
    try {
      const response = await postReplyByCommentId(commentData.comment.id, {
        content: replyText.trim(),
      });
      console.log('Submitting comment:', replyText.trim()); // 입력된 댓글 내용 확인
      if (response.success) {
        const locationHeader = response.headers.location;
        const replyId = locationHeader.split('/').pop(); // URL에서 ID 추출
        console.log('replyId:', replyId);
        const newReplyData = {
          replyId,
          author: {
            id: currentUser.id,
            nickname: currentUser.nickname,
            avatar: currentUser.avatar,
          },
          content: replyText.trim(),
          likeCount: 0,
          totalCount: 0,
        };
        setReplies((currentReplies) => [...currentReplies, newReplyData]);
        setAreRepliesVisible(true);
        setIsReplying(false);
      } else {
        console.error('Failed to submit reply:', response.error);
      }
    } catch (error) {
      console.error('Error while posting reply:', error);
    }
  };

  // 댓글 좋아요
  const handleToggleLike = async () => {
    const updatedIsLiked = !isLiked;
    setIsLiked(updatedIsLiked);
    const newLikesCount = updatedIsLiked ? likes + 1 : likes - 1;
    setLikes(newLikesCount);
    console.log('isLiked', isLiked);
    try {
      const response = await putCommentLikeBySolutionIdAndCommentId(
        commentData.solutionId,
        commentData.comment.id,
      );
      if (!response.success) {
        setIsLiked(!updatedIsLiked); // 상태를 이전으로 되돌립니다.
        setLikes(likes);
        localStorage.setItem(
          `likedComment-${commentData.comment.id}`,
          JSON.stringify(updatedIsLiked),
        );
        onLikeUpdate();
      }
    } catch (error) {
      setIsLiked(!updatedIsLiked); // 에러 발생 시 상태를 이전으로 되돌립니다.
      setLikes(likes);
    }
  };

  // 대댓글 좋아요
  const handleLikeReply = async (replyId) => {
    const replyIndex = replies.findIndex((reply) => reply.replyId === replyId);
    if (replyIndex === -1) {
      console.error('Reply not found');
      return;
    }
    const updatedIsLiked = !replies[replyIndex].like;
    const newLikesCount = updatedIsLiked
      ? replies[replyIndex].likeCount + 1
      : replies[replyIndex].likeCount - 1;
    // 로컬 상태 업데이트
    const updatedReplies = [...replies];
    updatedReplies[replyIndex] = {
      ...replies[replyIndex],
      like: updatedIsLiked,
      likeCount: newLikesCount,
    };
    setReplies(updatedReplies);
    // 서버 요청
    try {
      const response = await putReplyLikeByCommentIdAndReplyId(
        commentData.comment.id,
        replyId,
      );
      if (!response.success) {
        console.error('Server request failed:', response.error);
      }
    } catch (error) {
      console.error('Error while updating like:', error);
    }
  };

  const handleEditReply = async (replyId, newContent) => {
    if (!newContent.trim()) {
      alert('Reply content cannot be empty');
      return;
    }
    try {
      const response = await putReplyByCommentIdAndReplyID(
        commentData.comment.id,
        replyId,
        {
          content: newContent.trim(),
        },
      );
      if (response.success) {
        // 수정 성공: replies 상태 업데이트
        setReplies(
          replies.map((reply) =>
            reply.replyId === replyId ? { ...reply, content: newContent } : reply,
          ),
        );
        console.log('Reply updated successfully');
        setEditingReplyId(null);
        fetchReplies();
      } else {
        console.error('Failed to edit reply:', response.error);
      }
    } catch (error) {
      console.error('Error while editing reply:', error);
    }
  };
  // 대댓글 수정 시작
  const startEditReply = (replyId, currentContent) => {
    setEditingReplyId(replyId);
    setEditedReplyContent(currentContent);
  };

  // 대댓글 수정 취소
  const cancelEditReply = () => {
    setEditingReplyId(null);
    setEditedReplyContent('');
  };

  const handleDeleteReply = async (replyId) => {
    const confirmDelete = window.confirm('정말로 답글을 삭제하시겠습니까?');
    if (confirmDelete) {
      try {
        const response = await deleteReplyByCommentIdAndReplyId(
          commentData.comment.id,
          replyId,
        );
        if (response.success) {
          // 삭제 성공: replies 상태 업데이트
          setReplies(replies.filter((reply) => reply.replyId !== replyId));
          console.log('Reply deleted successfully');
          fetchReplies();
        } else {
          console.error('Failed to delete reply:', response.error);
        }
      } catch (error) {
        console.error('Error while deleting reply:', error);
      }
    }
  };

  const toggleEdit = () => {
    setIsEditing(!isEditing); // 댓글 수정 상태 토글
  };

  const handleEdit = async () => {
    if (
      typeof commentData.solutionId === 'undefined' ||
      commentData.solutionId === null
    ) {
      console.error('No valid solutionId provided');
      return;
    }
    handleCommentSelect();
    console.log('Editing comment ID: ', commentData.comment.id);
    // 댓글 수정 요청 보내기
    const response = await putCommentBySolutionIdAndCommentId(
      commentData.solutionId,
      commentData.comment.id,
      {
        content: editedContent,
      },
    );
    if (response.success) {
      // 수정 성공 시 댓글 내용 갱신 및 수정 모드 종료
      commentData.comment.content = editedContent; // 댓글 내용 업데이트
      toggleEdit(); // 수정 모드 종료
    } else {
      console.error(response.error);
    }
  };

  // 댓글 편집 시작 함수
  const startEditComment = (commentId, content) => {
    setIsEditing(true);
    setEditedContent(content); // 댓글 내용 업데이트
    dispatch(setActiveCommentId(commentId)); // 현재 편집중인 댓글 ID 업데이트
  };

  const handleDelete = () => {
    if (
      typeof commentData.solutionId === 'undefined' ||
      commentData.solutionId === null
    ) {
      console.error('No valid solutionId provided');
      return;
    }
    const confirmDelete = window.confirm('정말로 삭제하시겠습니까?');
    if (confirmDelete) {
      deleteCommentBySolutionIdAndCommentId(
        commentData.solutionId,
        commentData.comment.id,
      )
        .then((response) => {
          if (response.success) {
            console.log('풀이 글 삭제 완료');
            onDelete();
          } else {
            console.error(response.error);
          }
        })
        .catch((error) => {
          console.error('Failed to delete comment:', error);
        });
    }
  };

  return (
    <div
      className="group bg-neutral-200 text-black p-4 rounded-lg shadow-md shadow-zinc-300"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      onClick={handleCommentSelect}
    >
      {isEditing ? ( // 수정 중일 때
        <>
          <textarea
            className="w-full h-20 p-2 bg-white rounded-lg text-black shadow-md"
            value={editedContent}
            onChange={(e) => setEditedContent(e.target.value)}
          />
          <div className="flex justify-end">
            <button
              className="px-4 py-2 mt-2 bg-red-600 hover:bg-red-400 text-white rounded-md mr-2.5 shadow-md shadow-red-400"
              onClick={toggleEdit}
            >
              Cancel
            </button>
            <button
              className="px-4 py-2 mt-2 bg-green-500 hover:bg-green-400 text-white rounded-md shadow-md shadow-green-400"
              onClick={handleEdit}
            >
              Save
            </button>
          </div>
        </>
      ) : (
        <>
          <div className="flex items-center">
            <Avatar avatar={commentData.author.avatar} />

            <div className="flex flex-grow justify-between items-center ml-4">
              <div className="font-semibold">{commentData.author.nickname}</div>
            </div>
          </div>
          <p className="text-black mt-5">{commentData.comment.content}</p>
          <div className="flex items-center mt-5">
            <LikeButton isLiked={isLiked} handleToggleLike={handleToggleLike} />
            <span className="ml-1 text-red-500 mr-5">{likes}</span>
            <RepliesToggleButton
              isVisible={areRepliesVisible}
              onToggle={() => setAreRepliesVisible(!areRepliesVisible)}
            />
            <div className="ml-5">
              <ReplyButton onReply={toggleReplyInput} />
            </div>
            <div
              className={`flex ml-5 items-center transition-opacity duration-500 ${
                isHovering &&
                currentUser?.nickname === commentData.author.nickname
                  ? 'opacity-100'
                  : 'opacity-0'
              }`}
            >
              {canEditComment && (
                <div
                  className="flex items-center cursor-pointer"
                  onClick={() =>
                    startEditComment(
                      commentData.comment.id,
                      commentData.comment.content,
                    )
                  }
                >
                  <Edit /> {/* 수정 버튼 */}
                  <span className="mr-1">Edit</span>
                </div>
              )}
            </div>
            {canEditComment && (
              <div className="flex ml-5 items-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <button
                  className="flex cursor-pointer items-center"
                  onClick={handleDelete}
                >
                  <Delete />
                  <span className="ml-1">Delete</span>
                </button>
              </div>
            )}
          </div>{' '}
        </>
      )}

      {areRepliesVisible && (
        <div className="mt-1 space-y-4 p-5">
          {replies?.map((reply) =>
            editingReplyId === reply.replyId ? ( // 수정 중인 대댓글 UI
              <div
                key={reply.replyId}
                className="bg-neutral-100 text-black p-3 rounded-lg shadow-md"
              >
                <textarea
                  className="w-full h-20 p-2 bg-white rounded-lg text-black"
                  value={editedReplyContent}
                  onChange={(e) => setEditedReplyContent(e.target.value)}
                />
                <div className="flex justify-end mt-2">
                  <button
                    className="mr-2 px-4 py-2 bg-red-600 hover:bg-red-400 text-white rounded-md shadow-md shadow-red-400"
                    onClick={cancelEditReply}
                  >
                    Cancel
                  </button>
                  <button
                    className="px-4 py-2 bg-green-500 hover:bg-green-400 text-white rounded-md shadow-md shadow-green-400"
                    onClick={() =>
                      handleEditReply(reply.replyId, editedReplyContent)
                    }
                  >
                    Save
                  </button>
                </div>
              </div>
            ) : (
              <Comment
                key={reply.replyId}
                nickname={reply.author.nickname}
                content={reply.content}
                avatar={reply.author.avatar}
                likes={reply.likeCount}
                handleLike={() => handleLikeReply(reply.replyId)}
                isLiked={reply.like}
                handleEdit={
                  currentUser.nickname === reply.author.nickname
                    ? () => startEditReply(reply.replyId, reply.content)
                    : null
                }
                handleDelete={
                  currentUser.nickname === reply.author.nickname
                    ? () => handleDeleteReply(reply.replyId)
                    : null
                }
                currentUserNickname={currentUser.nickname}
              />
            ),
          )}
        </div>
      )}
      {isReplying && ( // ReplyButton 클릭시 보이는 CommentInput
        <CommentInput
          placeholder={`@${commentData.author.nickname}`}
          onComment={handleReplySubmit}
          onCancel={toggleReplyInput}
          avatar={commentData.author.avatar}
        />
      )}
    </div>
  );
}

export default CommentSection;
