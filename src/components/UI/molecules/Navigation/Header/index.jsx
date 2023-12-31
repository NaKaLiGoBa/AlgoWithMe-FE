import React, { useState } from 'react';
import Link from '../../../atoms/Text/Link';
import Logo from '../../../atoms/Logo';

export default function index({ className }) {
  const [token, setToken] = useState(localStorage.getItem('ACCESS_TOKEN'));

  const handleLogout = () => {
    localStorage.removeItem('ACCESS_TOKEN');
    setToken(null);
  };

  return (
    <header
      className={`h-[50px] top-0 left-0 right-0 flex items-center px-9 justify-between shadow-md ${className}`}
    >
      <Logo />
      {token ? (
        <Link to="/">
          <button type="button" onClick={handleLogout}>
            로그아웃
          </button>
        </Link>
      ) : (
        <div>
          <Link to={{ pathname: '/signup', state: { statusCode: 1 } }}>
            회원가입
          </Link>
          <Link to="/signin" className="px-7">
            로그인
          </Link>
        </div>
      )}
    </header>
  );
}
