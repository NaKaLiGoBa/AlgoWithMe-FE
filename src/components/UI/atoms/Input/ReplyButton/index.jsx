import React from 'react';

function index({ onReply }) {
  return (
    <div className="flex items-center group cursor-pointer gap-1 transition-colors" onClick={onReply}>
      <svg
        className="w-4.5 h-4.5 text-gray-6 dark:text-dark-gray-6 group-hover:text-gray-7 dark:group-hover:text-dark-gray-7"
        fill="currentColor"
        viewBox="0 0 16 16"
        width="1em"
        height="1em"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M5.83 2.106c.628-.634 1.71-.189 1.71.704v2.065c4.821.94 6.97 4.547 7.73 8.085l-.651.14.652-.134c.157.757-.83 1.192-1.284.565l-.007-.009c-1.528-2.055-3.576-3.332-6.44-3.502v2.352c0 .893-1.082 1.338-1.71.704L1.091 8.295a1 1 0 010-1.408l4.737-4.78zm7.303 8.617C12.08 8.495 10.204 6.68 7.046 6.14c-.47-.08-.84-.486-.84-.99V3.62L2.271 7.591l3.934 3.971V9.667a.993.993 0 011.018-.995c2.397.065 4.339.803 5.909 2.051z" />
      </svg>
      <span className="ml-1 text-white">Reply</span>
    </div>
  );
}

export default index;
