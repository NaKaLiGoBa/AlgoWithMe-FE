import React, { useState, useEffect } from 'react';
import LikeButton from '../../atoms/Input/LikeButton';
import RepliesToggleButton from '../../atoms/Toggle/RepliesToggleButton';
import ReplyButton from '../../atoms/Input/ReplyButton';
import Comment from '../../atoms/Input/Comment';
import CommentInput from '../../atoms/Input/CommentInput';
import Button from '../../atoms/Input/Button';
import getReplyByCommentId from '../../../../utils/api/v1/Reply/getReplyByCommentId';
import postReplyByCommentId from '../../../../utils/api/v1/Reply/postReplyByCommentId';
import postReplyLikeByCommentIdAndReplyId from '../../../../utils/api/v1/Reply/postReplyLikeByCommentIdAndReplyId';

function CommentSection({ commentData }) {
  const [areRepliesVisible, setAreRepliesVisible] = useState(false);
  const [replies, setReplies] = useState(commentData.replies || []);

  useEffect(() => {
    if (areRepliesVisible && replies.length === 0) {
      getReplyByCommentId(commentData.id)
        .then((response) => {
          if (response.success) {
            setReplies(response.data.replies);
          } else {
            console.error(response.error);
          }
        })
        .catch((error) => {
          console.error('Failed to fetch replies:', error);
        });
    }
  }, [areRepliesVisible, commentData.id]);

  const handleReply = async (replyText) => {
    if (!replyText.trim()) return;
    const response = await postReplyByCommentId(commentData.id, {
      content: replyText.trim(),
    });
    if (response.success) {
      setReplies([...replies, response.data]);
    } else {
      console.error(response.error);
    }
  };

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

  return (
    <div className="bg-gray-800 text-white p-4 rounded-lg">
      <div className="flex justify-end">
        <Button className="rounded-lg p-2 mr-2.5">수정</Button>
        <Button className="bg-red-600 hover:bg-red-400 rounded-lg p-2">
          삭제
        </Button>
      </div>
      <div className="flex items-center">
        <img
          className="w-10 h-10 rounded-full mr-4"
          src={commentData.avatar} // 이미지 URL을 데이터 객체에서 가져오기
          alt={`${commentData.username}'s avatar`}
        />

        <div className="flex flex-grow justify-between items-center">
          <div className="font-semibold">{commentData.username}</div>
          <div className=" text-gray-400 text-sm">{commentData.timestamp}</div>
        </div>
      </div>
      <p className="text-white mt-2">{commentData.content}</p>
      <div className="flex items-center mt-3">
        <LikeButton />
        <span className="ml-1 text-red-500 mr-5">{commentData.likes}</span>
        <RepliesToggleButton
          isVisible={areRepliesVisible}
          onToggle={() => setAreRepliesVisible(!areRepliesVisible)}
        />
        <div className="ml-5">
          <ReplyButton />
        </div>
      </div>

      {areRepliesVisible && (
        <div className="mt-1 space-y-4 p-5">
          {commentData.replies?.map((reply) => (
            <Comment
              key={reply.id}
              username={reply.username}
              timestamp={reply.timestamp}
              content={reply.content}
              avatar={reply.avatar || commentData.avatar}
              handleLike={() => handleLikeReply(reply.id)}
            />
          ))}
          <CommentInput
            placeholder={`@${commentData.username}`}
            onComment={handleReply}
          />
        </div>
      )}
    </div>
  );
}

export default CommentSection;
