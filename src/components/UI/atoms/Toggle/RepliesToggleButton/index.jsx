import React from 'react';

function RepliesToggleButton({ isVisible, onToggle }) {
  return (
    <button onClick={() => onToggle(!isVisible)} className="flex items-center">
      <svg
        className="h-6 w-6 text-green-500"
        fill={isVisible ? 'currentColor' : 'none'}
        height="24"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        viewBox="0 0 24 24"
        width="24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="m3 21 1.9-5.7a8.5 8.5 0 1 1 3.8 3.8z" />
      </svg>
      <span className="ml-1 text-green-500">
        {isVisible ? 'Hide Replies' : 'Show Replies'}
      </span>
    </button>
  );
}

export default RepliesToggleButton;
