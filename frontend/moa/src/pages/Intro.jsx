import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { userApi } from '../api/userApi';
import Cookies from 'js-cookie';

import { useAppDispatch } from '../store'; // useDispatch를 사용하는 부분을 변경
import { setAccessToken } from '../store';

const introStyle = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  minHeight: '100vh',
  padding: '0 30px',
  fontFamily: 'Pretendard-Regular'
};

const introCommentStyle = {
  display: 'flex',
  textAlign: 'left',
  fontSize: '24px',
  fontWeight: '700',
  margin: '20px 0',
};

const logoContainerStyle = {
  display: 'flex',
  marginBottom: '250px',
};

const logoStyle = {
  margin: '5px',
  width: '70px',
  height: '70px',
};

const buttonContainerStyle = {
  margin: '20px 0'
};

const buttonStyle = {
  margin: '10px auto',
  padding: '12px',
  background: 'white',
  border: 'none',
  borderRadius: '10px',
  boxShadow: '0px 10px 10px rgba(196, 221, 124, 0.25)',
  color: '#92BB69',
  fontSize: '20px',
  fontWeight: '700',
  width: '100%',

};

function Intro(props) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();


  return (
    <div style={introStyle}>
      <div style={introCommentStyle}>
        <span>
          모아보는 한글,
          <br />
          More Friendly 한국
        </span>
      </div>

      <div style={logoContainerStyle}>
        <div>
          <img style={logoStyle} src={process.env.PUBLIC_URL + '/assets/Logo/Logo_M.png'} alt="M" />
        </div>
        <div>
          <img style={logoStyle} src={process.env.PUBLIC_URL + '/assets/Logo/Logo_O.png'} alt="O" />
        </div>
        <div>
          <img style={logoStyle} src={process.env.PUBLIC_URL + '/assets/Logo/Logo_A.png'} alt="A" />
        </div>
      </div>

      <div style={buttonContainerStyle}>
        <Link to="/login">
          <button style={buttonStyle}>로그인</button>
        </Link>
        <Link to="/signup">
          <button style={buttonStyle}>회원가입</button>
        </Link>
      </div>
    </div>
  );
}

export default Intro;