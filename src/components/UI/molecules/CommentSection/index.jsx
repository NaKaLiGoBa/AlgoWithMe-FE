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
import postReplyLikeByCommentIdAndReplyId from '../../../../utils/api/v1/Reply/postReplyLikeByCommentIdAndReplyId';
import deleteCommentBySolutionIdAndCommentId from '../../../../utils/api/v1/comment/deleteCommentBySolutionIdAndCommentId';
import postCommentLikeBySolutionIdAndCommentId from '../../../../utils/api/v1/comment/postCommentLikeBySolutionIdAndCommentId';
import { selectUser } from '../../../../store/userSlice';
import putCommentBySolutionIdAndCommentId from '../../../../utils/api/v1/comment/putCommentBySolutionIdAndCommentId';
import { setActiveCommentId } from '../../../../store/commentSlice';

function CommentSection({ commentData, onDelete }) {
  const [areRepliesVisible, setAreRepliesVisible] = useState(false);
  const [replies, setReplies] = useState(
    Array.isArray(commentData.replies) ? commentData.replies : [],
  );
  const [isReplying, setIsReplying] = useState(false); // 댓글 입력 상태
  const [isHovering, setIsHovering] = useState(false);
  const currentUser = useSelector(selectUser);
  const [isEditing, setIsEditing] = useState(false); // 댓글 수정 상태
  const [editedContent, setEditedContent] = useState(commentData.content); // 수정할 댓글 내용
  const [likes, setLikes] = useState(commentData.likes || 0);
  const [isLiked, setIsLiked] = useState(commentData.isLiked || false);

  const dispatch = useDispatch();

  // 댓글 ID 설정
  const handleCommentSelect = () => {
    dispatch(setActiveCommentId(commentData.id));
  };
  const canEditComment = currentUser.id === commentData.userId;

  useEffect(() => {
    console.log('Received comment data:', commentData);
    const fetchReplies = async () => {
      try {
        const response = await getReplyByCommentId(commentData.id);
        if (response.success) {
          setReplies(response.data.replies);
        } else {
          console.error('Failed to fetch replies:', response.error);
        }
      } catch (error) {
        console.error('Failed to fetch replies:', error);
      }
    };

    if (areRepliesVisible && replies.length === 0 && commentData.id) {
      fetchReplies();
    }
  }, [areRepliesVisible, replies.length, commentData.id]);

  const toggleReplyInput = () => {
    setIsReplying(!isReplying); // 댓글 입력 상태 토글
  };

  const handleReply = async (replyText) => {
    handleCommentSelect();
    if (!replyText.trim()) return;
    try {
      const response = await postReplyByCommentId(commentData.id, {
        content: replyText.trim(),
      });
      if (response.success) {
        const locationHeader = response.headers['location'];
        const replyId = locationHeader.split('/').pop(); // URL에서 ID 추출

        const newReplyData = {
          id: replyId,
          content: replyText.trim(),
          // 대댓글 작성자 정보 추가
          userId: currentUser.id,
        };
        setReplies([...replies, newReplyData]);
        setAreRepliesVisible(true);
        setIsReplying(false);
      } else {
        console.error(response.error);
      }
    } catch (error) {
      console.error('Error while posting reply:', error);
    }
  };

  // 댓글 좋아요
  const handleToggleLike = async () => {
    setIsLiked(!isLiked);
    const newLikesCount = isLiked ? likes - 1 : likes + 1;
    setLikes(newLikesCount);

    try {
      const response = await postCommentLikeBySolutionIdAndCommentId(
        commentData.solutionId,
        commentData.id,
      );
      if (!response.success) {
        console.error(response.error);
        // 실패한 경우 다시 원래 상태로 되돌림
        setIsLiked(isLiked);
        setLikes(likes);
      }
    } catch (error) {
      console.error('Failed to update like:', error);
      // 에러 발생 시 원래 상태로 되돌림
      setIsLiked(isLiked);
      setLikes(likes);
    }
  };

  // 대댓글 좋아요
  const handleLikeReply = async (replyId) => {
    const response = await postReplyLikeByCommentIdAndReplyId(
      commentData.id,
      replyId,
    );
    if (response.success) {
      setReplies(
        replies.map((reply) => {
          if (reply.id === replyId) {
            return { ...reply, isLiked: response.data.isLike };
          }
          return reply;
        }),
      );
    } else {
      console.error(response.error);
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
    console.log('Editing comment ID: ', commentData.id);
    // 댓글 수정 요청 보내기
    const response = await putCommentBySolutionIdAndCommentId(
      commentData.solutionId,
      commentData.id,
      {
        content: editedContent,
      },
    );

    if (response.success) {
      // 수정 성공 시 댓글 내용 갱신 및 수정 모드 종료
      commentData.content = editedContent; // 댓글 내용 업데이트
      toggleEdit(); // 수정 모드 종료
    } else {
      console.error(response.error);
    }
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
        commentData.id,
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
      className="group bg-gray-800 text-white p-4 rounded-lg"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      onClick={handleCommentSelect}
    >
      {isEditing ? ( // 수정 중일 때
        <>
          <textarea
            className="w-full h-20 p-2 bg-gray-700 rounded-lg text-white"
            value={editedContent}
            onChange={(e) => setEditedContent(e.target.value)}
          />
          <div className="flex justify-end">
            <button
              className="px-4 py-2 mt-2 bg-red-600 hover:bg-red-400 text-white rounded-md mr-2.5"
              onClick={toggleEdit}
            >
              Cancel
            </button>
            <button
              className="px-4 py-2 mt-2 bg-green-500 hover:bg-green-400 text-white rounded-md "
              onClick={handleEdit}
            >
              Save
            </button>
          </div>
        </>
      ) : (
        <>
          <div className="flex items-center">
            <img
              className="w-10 h-10 rounded-full mr-4"
              src={commentData.avatar} // 이미지 URL을 데이터 객체에서 가져오기
              alt={`${commentData.username}'s avatar`}
            />

            <div className="flex flex-grow justify-between items-center">
              <div className="font-semibold">{commentData.username}</div>
              <div className=" text-gray-400 text-sm">
                {commentData.timestamp}
              </div>
            </div>
          </div>
          <p className="text-white mt-2">{commentData.content}</p>
          <div className="flex items-center mt-3">
            <LikeButton isLiked={isLiked} onClick={handleToggleLike} />
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
                isHovering && currentUser?.id === commentData.userId
                  ? 'opacity-100'
                  : 'opacity-0'
              }`}
            >
              {canEditComment && (
                <div
                  className="flex ml-5 items-center cursor-pointer"
                  onClick={toggleEdit}
                >
                  <Edit /> {/* 수정 버튼 */}
                  <span className="ml-1">Edit</span>
                </div>
              )}
            </div>
            <div className="flex ml-5 items-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              <button
                className="flex cursor-pointer items-center"
                onClick={handleDelete}
              >
                <Delete />
                <span className="ml-1">Delete</span>
              </button>
            </div>
          </div>{' '}
        </>
      )}
      {isReplying && ( // ReplyButton 클릭시 보이는 CommentInput
        <CommentInput
          placeholder={`@${commentData.username}`}
          onComment={handleReply}
          onCancel={toggleReplyInput}
        />
      )}

      {areRepliesVisible && (
        <div className="mt-1 space-y-4 p-5">
          {commentData.replies?.map((reply) => (
            <Comment
              key={reply.id}
              commentData={reply}
              currentUser={currentUser}
              username={reply.username}
              timestamp={reply.timestamp}
              content={reply.content}
              avatar={reply.avatar || commentData.avatar}
              handleLike={() => handleLikeReply(reply.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default CommentSection;
