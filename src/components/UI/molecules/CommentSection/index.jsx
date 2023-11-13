import React, { useState } from 'react';
import LikeButton from '../../atoms/Input/LikeButton';
import RepliesToggleButton from '../../atoms/Toggle/RepliesToggleButton';
import ReplyButton from '../../atoms/Input/ReplyButton';
import Comment from '../../atoms/Input/Comment';
import CommentInput from '../../atoms/Input/CommentInput';

function CommentSection({ commentData }) {
  const [areRepliesVisible, setAreRepliesVisible] = useState(false);

  return (
    <div className="bg-gray-800 text-white p-4 rounded-lg">
      <div className="flex items-center">
          <img
            className="w-10 h-10 rounded-full mr-4"
            src={commentData.avatar} // 이미지 URL을 데이터 객체에서 가져오기
            alt={`${commentData.username}'s avatar`}
          />
          <div className='flex flex-grow justify-between items-center'>
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
          {commentData.replies.map((reply) => (
            <Comment
              key={reply.id}
              username={reply.username}
              timestamp={reply.timestamp}
              content={reply.content}
              avatar={commentData.avatar}
            />
          ))}
          <CommentInput
            placeholder={`@${commentData.username}`}
            onCancel={() => {}}
            onComment={() => {}}
          />
        </div>
      )}
    </div>
  );
}

export default CommentSection;
