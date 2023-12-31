import React, { useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux'; 
import axios from 'axios';
import Button from '../../../atoms/Input/Button';
import Heading from '../../../atoms/Text/Heading';
import Text from '../../../atoms/Text/Text';
import Input from '../../../atoms/Input/Input';
import KakaoImage from '../../../../../../public/assets/img/kakao.png';
import {localHostURL} from '../../../../../utils/apiConfig'
import { setNickname } from '../../../../../store/userSlice';

function Signin() {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';

  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // 로그인 에러 상태 관리
  const [errorMessage, setErrorMessage] = useState('');


  const checkLogin = async () => {
    if (!email && !password) {
      setErrorMessage('이메일을 입력해주세요');
      return;
    }
    if (!email) {
      setErrorMessage('이메일을 입력해주세요');
      return;
    }
    if (!password) {
      setErrorMessage('비밀번호를 입력해주세요');
      return;
    }
    try {
      const response = await axios.post(
        `${localHostURL}/api/v1/auth/signin`,
        {
          email: email,
          password: password,
        },
      );
      if (response.status === 200) {
        // 성공 로직
        if (response.data && response.data.accessToken) {
          localStorage.setItem('ACCESS_TOKEN', response.data.accessToken);
          console.log("nickname", response.data.nickname)
          dispatch(setNickname(response.data.nickname)); 
          setErrorMessage(''); // 에러 상태 초기화
          alert(response.data.message);
          navigate(from);
        } else {
          setErrorMessage('로그인에 실패했습니다. 다시 시도해 주세요.');
        }
      } else if (response.status === 401) {
        // 권한 없음, 로그인 실패 로직
        setErrorMessage('이메일 또는 비밀번호가 일치하지 않습니다.');
      } else {
        // 기타 에러 로직
        setErrorMessage('서버에서 오류가 발생하였습니다. 다시 시도해 주세요.');
      }
    } catch (error) {
      // 로그인 에러 표시
      console.error('Login Error:', error);
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        // 서버에서 에러 메시지를 제공하는 경우
        setErrorMessage(error.response.data.message);
      } else {
        // 그 외의 클라이언트 측에서 잡힌 에러
        setErrorMessage('로그인에 실패했습니다. 다시 시도해 주세요.');
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await checkLogin();
  };

  // 카카오 로그인 로직 추가하기
  const REST_API_KEY = "ea0d5d44e5604a884f97c30d752b5b90";
  const REDIRECT_URI = `${localHostURL}/auth/signin/kakao`;
  const KAKAO_AUTH_URI = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;

  const handleKakaoLogin = () => {
    console.log('Kakao login clicked');
    window.location.href = KAKAO_AUTH_URI;
  };

  return (
    <div className="p-8 w-96 h-full">
      <Heading
        level={1}
        className="p-8 bg-white shadow-md rounded
       text-5xl font-bold text-center mb-10"
      >
        Algo 있니?
      </Heading>
      <Heading level={2}>이메일</Heading>

      <form onSubmit={handleSubmit}>
        <Input
          type="email"
          placeholder="이메일"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mb-10"
        />
        <Heading level={2}>비밀번호</Heading>
        <Input
          type="password"
          value={password}
          placeholder="비밀번호"
          onChange={(e) => setPassword(e.target.value)}
          className="mb-4"
        />
        <div className="mt-1 mb-5 text-right">
          <Link to="/password" className="text-blue-500 hover:underline">
            비밀번호 찾기
          </Link>
        </div>

        {errorMessage && <p className="text-red-500 mb-5">{errorMessage}</p>}

        <Button type="submit" className="w-full mb-8">
          로그인
        </Button>
        <div className="text-center">
          <Text>카카오 계정으로 로그인하기</Text>
        </div>

        <div className="flex flex-row my-5 justify-center items-center">
          <button
            type="button"
            className="w-16 h-16 p-0 border-none rounded-full overflow-hidden shadow-lg hover:shadow-xl"
            onClick={handleKakaoLogin}
          >
            <img src={KakaoImage} alt="카카오 로그인" />
          </button>
        </div>

        <Link to={{ pathname: "/signup", state: { statusCode: 1 } }}>
          <Button
            type="submit"
            className="w-full bg-white border border-blue-600 hover:bg-blue-200 text-blue-500 mt-10"
          >
            계정 만들기
          </Button>
        </Link>
      </form>
    </div>
  );
}

export default Signin;
