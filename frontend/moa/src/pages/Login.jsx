import React from 'react';
import BackButton from '../components/BackButton';
import MainButton from '../components/MainButton';

function Login(props) {
  return (
    <div>
      <p>Login Page</p>
      <div className='loginContainer'>
        <div className="inputForm">
          <label htmlFor="email" className="inputTitle">이메일</label>
          <input type="text" id="email" name="email"/>
        </div>

        <div className="inputForm">
          <label htmlFor="password" className="inputTitle">비밀번호</label>
          <input type="password" id="password" name="password"/>
        </div>
        {/* 로그인 기능 기능구현은 X */}
        <MainButton text="로그인" to="/main" />
      </div>
      {/* <BackButton /> */}
    </div>
  );
}

export default Login;