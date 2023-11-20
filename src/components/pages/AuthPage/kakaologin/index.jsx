import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { localHostURL } from '../../../../utils/apiConfig';

function index() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const sendCodeToBackend = async (code) => {
    setLoading(true);
    try {
      const response = await axios.post(
        `${localHostURL}/api/v1/auth/signin/kakao`,
        {
          authCode: code,
        },
      );
      // 로그인 처리
      if (response.data && response.data.accessToken) {
        localStorage.setItem('ACCESS_TOKEN', response.data.accessToken);
        alert(response.data.message);
        navigate('/'); // 홈 화면으로 이동
      }
    } catch (error) {
      console.error('Error sending code to backend:', error);
      alert(
        error?.response?.data?.message || 'An error occurred during sign in.',
      );
      if (error?.response?.status === 401) {
        navigate('/signup'); // 회원가입 페이지로 이동
      }
    } finally {
      setLoading(false); // 로딩 상태 종료
    }
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');

    if (code) {
      // 백엔드에 인가 코드 전송
      sendCodeToBackend(code);
    } else {
      setLoading(false);
    }
  }, []);

  if (loading) {
    return <div>로그인 중입니다...</div>;
  } 
    return <div>로그인에 실패했습니다. 다시 시도해주세요.</div>;
  
}

export default index;
