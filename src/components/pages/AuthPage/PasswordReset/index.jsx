import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import Heading from '../../../UI/atoms/Text/Heading';
import Input from '../../../UI/atoms/Input/Input';
import Button from '../../../UI/atoms/Input/Button';
import {localHostURL} from '../../../../utils/apiConfig'

const index = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get('token');

  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleNewPassword = (e) => setNewPassword(e.target.value);
  const handleConfirmNewPassword = (e) => setConfirmNewPassword(e.target.value);

  const handlePasswordReset = async () => {
    // 비밀번호 확인
    if (newPassword !== confirmNewPassword) {
      setMessage('비밀번호가 일치하지 않습니다.');
      return;
    }
    try {
      const response = await axios.post(
        `${localHostURL}/api/v1/auth/password/reset/check`,
        {
          token, // 서버로 URL에서 추출한 토큰 전달
          newPassword, // 새로운 비밀번호 전달
        },
      );

      if (response.data.code === '200') {
        setMessage('비밀번호 재설정이 완료되었습니다.');
        <Link to="/signin" />
      } else {
        setMessage(response.data.message);
      }
    } catch (error) {
      console.error('Failed to reset password:', error);
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
            새 비밀번호를 입력해주세요
          </Heading>
          <div>
            <Input
              type="password"
              value={newPassword}
              onChange={handleNewPassword}
              placeholder="새 비밀번호"
              className="mb-4"
            />
            <Input
              type="password"
              value={confirmNewPassword}
              onChange={handleConfirmNewPassword}
              placeholder="새 비밀번호 확인"
              className="mb-11"
            />
            <Button
              type="submit"
              className="w-full mb-8"
              onClick={handlePasswordReset}
            >
              인증
            </Button>
            {message && (
              <div className="mt-8 text-center text-red-600">
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
