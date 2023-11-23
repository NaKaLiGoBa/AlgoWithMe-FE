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
  currentUserNickname,
}) {
  const canEditOrDelete = currentUserNickname === nickname;
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
          <div className="flex items-center mr-5">
            <LikeButton onClick={handleLike} />
            <span className="ml-1 text-red-500 ">{likes}</span>
          </div>
        )}
        {canEditOrDelete && handleEdit && (
          <div className="flex ml-5 mr-5 items-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            <button
              className="flex cursor-pointer items-center"
              onClick={handleEdit}
            >
              <Edit />
              <span className="ml-1">Edit</span>
            </button>
          </div>
        )}
        {canEditOrDelete && handleDelete && (
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
      </div>
    </div>
  );
}

export default Comment;
