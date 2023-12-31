import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Heading from '../../../UI/atoms/Text/Heading';
import Input from '../../../UI/atoms/Input/Input';
import Button from '../../../UI/atoms/Input/Button';
import {localHostURL} from '../../../../utils/apiConfig'

const index = () => {
  const [email, setEmail] = useState(''); // 이메일 상태 관리
  const [message, setMessage] = useState(''); // 메시지 상태 관리

  const handleEmailChange = (e) => {
    setEmail(e.target.value); // 이메일 상태 업데이트
  };

  // 비밀번호 재설정 요청 핸들링 함수
  const handlePasswordResetRequest = async () => {
    try {
      const response = await axios.post(
        `${localHostURL}/api/v1/auth/password/reset/email`,
        {
          email,
        },
      );
      if (response.data && response.status === 200) {
        // 성공적인 응답을 처리
        setMessage(response.data.message);
      } else {
        // 에러 응답을 처리
        setMessage(response.data.message);
      }
    } catch (error) {
      console.error('Failed to fetch:', error);
      setMessage('오류가 발생했습니다. 다시 시도해주세요.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="p-8 bg-white shadow-md rounded">
        <div className="p-8 w-96 h-full">
          <Heading
            level={1}
            className="p-8 bg-white shadow-md rounded
       text-5xl font-bold text-center mb-6"
          >
            Algo 있니?
          </Heading>
          <Heading level={2} className="text-center">
            비밀번호를 재설정합니다.
          </Heading>
          <Heading level={3} className="mt-10 text-center mb-4">
            계정의 이메일을 입력해 주세요.
          </Heading>
          <div>
            <Input
              type="email"
              name="email"
              placeholder="이메일"
              value={email}
              onChange={handleEmailChange}
              className="mb-11"
            />
            <Button
              type="submit"
              className="w-full mb-8"
              onClick={handlePasswordResetRequest}
            >
              인증
            </Button>
            {message && (
              <div className="mt-12 text-center">
                <p>{message}</p>
              </div>
            )}
          </div>
          <div className="flex justify-between items-center my-5">
            <div className="mt-6 h-px w-full bg-gray-400" />
          </div>
          <div className="mt-8 text-center">
            이미 계정이 있습니까?{' '}
            <Link to="/signin" className="text-blue-500 hover:underline">
              로그인
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default index;
