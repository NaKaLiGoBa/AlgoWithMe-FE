import React from 'react';
import { Link } from 'react-router-dom';

function Logo({ className }) {
  const defaultClass = 'h-[30px]'; // 기본 스타일 클래스
  const combinedClassNames = [defaultClass, className].join(' ');

  return (
    <Link to="/">
      <img
        src="/assets/img/logo_awm_light.png"
        alt="App logo"
        className={combinedClassNames}
      />
    </Link>
  );
}

export default Logo;
