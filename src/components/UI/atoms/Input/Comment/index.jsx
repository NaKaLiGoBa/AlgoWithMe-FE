import React from 'react';

function Comment({ username, timestamp, content }) {
  return (
    <div className="bg-gray-700 text-white p-3 rounded-lg">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div className="font-semibold">{username}</div>
        </div>
        <div className="text-gray-400 text-sm">{timestamp}</div>
      </div>
      <p className="text-gray-200 mt-1">{content}</p>
    </div>
  );
}

export default Comment;
