import React from 'react';

function CommentInput({ placeholder, onCancel, onComment }) {
  return (
    <div className="bg-gray-800 p-4 mt-4 rounded-lg justify-between items-center">
      <textarea
        className="bg-gray-700 text-white w-full p-3 rounded-lg flex-1"
        placeholder={placeholder}
      />
      <div className="flex justify-end mt-3">
        <button
          onClick={onCancel}
          className="bg-gray-600 hover:bg-gray-500 text-white mr-5 px-3 py-1 rounded-full text-m"
        >
          Cancel
        </button>
        <button
          onClick={onComment}
          className="bg-green-500 hover:bg-green-400 px-3 py-1 rounded-full text-m"
        >
          Comment
        </button>
      </div>
    </div>
  );
}

export default CommentInput;
