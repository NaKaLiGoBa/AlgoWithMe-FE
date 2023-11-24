import React, { useState } from 'react';
import Avatar from '../../Avatar';

function CommentInput({ placeholder, onCancel, onComment, avatar }) {
  const [inputText, setInputText] = useState('');

  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  const handleCommentClick = () => {
    onComment(inputText);
    setInputText('');
  };

  const handleCancelClick = () => {
    onCancel();
    setInputText('');
  };

  return (
    <div className="flex items-center">
      <div>
        <Avatar avatar={avatar} />
      </div>
      <div className="bg-neutral-100 p-4 mt-4 rounded-lg justify-between items-center w-full shadow-md shadow-zinc-300 ml-4">
        <textarea
          className="bg-white text-black w-full p-3 rounded-lg flex-1"
          placeholder={placeholder}
          value={inputText}
          onChange={handleInputChange}
        />
        <div className="flex justify-end mt-3">
          <button
            onClick={handleCancelClick}
            className="bg-red-600 hover:bg-red-400 text-white mr-5 px-3 py-1 rounded-full text-m shadow-md shadow-red-400"
          >
            Cancel
          </button>
          <button
            onClick={handleCommentClick}
            className="bg-green-500 hover:bg-green-400 text-white px-3 py-1 rounded-full text-m shadow-md shadow-green-400"
          >
            Comment
          </button>
        </div>
      </div>
    </div>
  );
}

export default CommentInput;
