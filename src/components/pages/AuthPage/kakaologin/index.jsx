import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';

function index() {
  const code = window.location.search;
  const navigate = useNavigate();

  // // 프론트에서 테스트 해보기위한 코드
  const mock = new MockAdapter(axios);
  // mock.onPost('http://50.19.246.89:8080/api/v1/auth/signin/kakao').reply(401, {
  //   message: '회원가입이 필요합니다',
  // });
  mock.onPost('http://50.19.246.89:8080/api/v1/auth/signin/kakao').reply(200, {
    accessToken: 'jwt_token_for_testing',
    message: '로그인 완료',
  });

  const sendCodeToBackend = async (authCode) => {
    try {
      const response = await axios.post(
        'http://50.19.246.89:8080/api/v1/auth/signin/kakao',
        { authCode },
      );
      // 로그인 처리
      if (response.status === 200) {
        // "완료"로 받은 상태 코드
        if (response.data && response.data.accessToken) {
          localStorage.setItem('token', response.data.accessToken);
          // 로그인 후 처리 로직
          if (response.data.message) {
            alert(response.data.message);
          }
          navigate('/'); // 홈 화면으로 이동
        }
      }
    } catch (error) {
      console.error('Error sending code to backend:', error);
      if (error.response) {
        // 서버에서 응답 메시지가 있는 경우
        if (error.response.data && error.response.data.message) {
          alert(error.response.data.message);
        }
        if (error.response.status === 401) {
          navigate('/signup'); // 회원가입 페이지로 이동
        }
      } else {
        // 기타 에러 로직
      }
    }
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');

    if (code) {
      // 백엔드에 인가 코드 전송
      sendCodeToBackend(code).then(() => {
        // 인가 코드를 전송한 후 URL에서 code 파라미터 제거
        const newURL = `${window.location.protocol}//${window.location.host}${window.location.pathname}`;
        window.history.replaceState({}, document.title, newURL);
      });
    }
  }, []);

  return <div>로그인 중입니다.</div>;
}

export default index;
