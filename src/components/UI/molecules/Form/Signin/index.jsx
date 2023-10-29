import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../../../atoms/Input/Button';
import Heading from '../../../atoms/Text/Heading';
import Text from '../../../atoms/Text/Text';
import Input from '../../../atoms/Input/Input';

function Signin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="p-8 w-96 h-full">
      <Heading level={1} className="p-8 bg-white shadow-md rounded
       text-5xl font-bold text-center mb-10">Algo 있니?
      </Heading>
      <Heading level={1}>이메일</Heading>

      <form onSubmit={handleSubmit}>
        <Input
          type="email"
          placeholder="이메일"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mb-10"
        />
        <Heading level={1}>비밀번호</Heading>
        <Input
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mb-4"
        />
        <div className="mt-1 mb-5 text-right">
          <Link to="/checkpassword" className="text-blue-500 hover:underline">
            비밀번호 찾기
          </Link>
        </div>
        <Link to="/homepage">
          <Button type="submit" className='w-full mb-8'>로그인</Button>
        </Link>
        <div className='text-center'>
        <Text>
          카카오 계정으로 로그인하기
        </Text>
        </div>
        <Link to="/signup">
          <Button
            type="submit"
            className="w-full bg-white border border-blue-600 hover:bg-blue-200 text-blue-500 mt-20"
          >
            계정 만들기
          </Button>
        </Link>
      </form>
    </div>
  );
}

export default Signin;
