import React from 'react';

function Comment({ username, timestamp, content, avatar }) {
  return (
    <div className="bg-gray-700 text-white p-3 rounded-lg">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <img
            className="w-10 h-10 rounded-full mr-4"
            src={avatar}
            alt={`${username}'s avatar`}
          />
          <div className="font-semibold">{username}</div>
        </div>
        <div className="text-gray-400 text-sm">{timestamp}</div>
      </div>
      <p className="text-gray-200 mt-1">{content}</p>
    </div>
  );
}

export default Comment;
