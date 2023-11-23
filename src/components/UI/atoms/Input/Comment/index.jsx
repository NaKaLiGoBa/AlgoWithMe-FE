import React from 'react';
import LikeButton from '../LikeButton';
import Delete from '../../Icon/Delete';
import Edit from '../../Icon/Edit';

function Comment({
  nickname,
  content,
  avatar,
  likes,
  handleLike,
  handleEdit,
  handleDelete,
}) {
  return (
    <div className="bg-gray-700 text-white p-3 rounded-lg">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <img
            className="w-10 h-10 rounded-full mr-4"
            src={avatar}
            alt={`${nickname}'s avatar`}
          />
          <div className="font-semibold">{nickname}</div>
        </div>
      </div>
      <p className="text-gray-200 mt-1">{content}</p>
      <div className="flex mt-2.5">
        {handleLike && (
          <div className="flex items-center mr-4">
            <LikeButton onClick={handleLike} />
            <span className="ml-1 text-red-500 mr-3">{likes}</span>
          </div>
        )}
        {handleEdit && (
          <button className="flex items-center mr-7" onClick={handleEdit}>
            <Edit />
            <span className="ml-1">Edit</span>
          </button>
        )}
        {handleDelete && (
          <button className="flex items-center ml-1" onClick={handleDelete}>
            <Delete />
            <span className="ml-1">Delete</span>
          </button>
        )}
      </div>
    </div>
  );
}

export default Comment;
