import React from 'react';
import Text from '../../atoms/Text/Text';
import Avatar from '../../atoms/Avatar';

function LikeCount({ likeCount = 0 }) {
  return (
    <div className="flex items-center gap-1 text-gray-500">
      <svg
        className="w-4 h-4"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 20 20"
      >
        <path
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M4.008 8.714c1-.097 1.96-.45 2.792-1.028a25.112 25.112 0 0 0 4.454-5.72 1.8 1.8 0 0 1 .654-.706 1.742 1.742 0 0 1 1.65-.098 1.82 1.82 0 0 1 .97 1.128c.075.248.097.51.065.767l-1.562 4.629M4.008 8.714H1v9.257c0 .273.106.535.294.728a.99.99 0 0 0 .709.301h1.002a.99.99 0 0 0 .71-.301c.187-.193.293-.455.293-.728V8.714Zm8.02-1.028h4.968c.322 0 .64.08.925.232.286.153.531.374.716.645a2.108 2.108 0 0 1 .242 1.883l-2.36 7.2c-.288.813-.48 1.354-1.884 1.354-2.59 0-5.39-1.06-7.504-1.66"
        />
      </svg>
      <p>{likeCount}</p>
    </div>
  );
}

function ViewCount({ viewCount = 0 }) {
  return (
    <div className="flex items-center gap-1 text-gray-500">
      <svg
        className="w-4 h-4 text-gray-500"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 20 14"
      >
        <g
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
        >
          <path d="M10 10a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
          <path d="M10 13c4.97 0 9-2.686 9-6s-4.03-6-9-6-9 2.686-9 6 4.03 6 9 6Z" />
        </g>
      </svg>
      <p>{viewCount}</p>
    </div>
  );
}

function CommentCount({ commentCount = 0 }) {
  return (
    <div className="flex items-center gap-1 text-gray-500">
      <svg
        className="w-4 h-4 text-gray-500"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 20 18"
      >
        <path
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M5 5h5M5 8h2m6-3h2m-5 3h6m2-7H2a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h3v5l5-5h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1Z"
        />
      </svg>
      <p>{commentCount}</p>
    </div>
  );
}

export default function index({
  avatar,
  nickname,
  title,
  onClick,
  likeCount,
  viewCount,
  commentCount,
}) {
  return (
    <div className="flex border-b-[1px] py-2" onClick={onClick}>
      <div className="px-2 py-4">
        <Avatar avatar={avatar} />
      </div>
      <div className="flex flex-col flex-grow gap-3 px-4">
        <Text>{nickname}</Text>
        <h2 className="text-lg font-bold text-left">{title}</h2>
        <div>tags</div>
        <div className="flex gap-4">
          <LikeCount likeCount={likeCount} />
          <ViewCount viewCount={viewCount} />
          <CommentCount commentCount={commentCount} />
        </div>
      </div>
    </div>
  );
}
