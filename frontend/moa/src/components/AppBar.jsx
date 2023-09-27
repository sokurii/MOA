import React from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { userApi } from '../api/userApi';
import Cookies from 'js-cookie';

import { useAppDispatch } from '../store'; // useDispatch를 사용하는 부분을 변경
import { setAccessToken } from '../store';

const appBarStyle = {
  display: 'flex', // Flexbox 컨테이너 설정
  justifyContent: 'space-between', // 로고 이미지와 로그아웃 버튼 사이 공간을 최대화
  padding: '0 10px',
  marginBottom: '10px',
  alignItems: 'center',
  boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
};

const imgContainerStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginLeft: '120px',
};

const imgStyle = {
  width: '50%',
  margin: '10px auto',
};

const logoutButtonStyle = {
  background: 'linear-gradient(to bottom, lightgreen, green)',
  color: 'white',
  border: 'none',
  padding: '10px 20px',
  borderRadius: '32px',
  cursor: 'pointer',
};

function AppBar(props) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  // 로그아웃 핸들러 함수
  const handleLogout = async () => {
    try{
      const response = await userApi.logout();

      if (response.data.success){
        console.log('로그아웃 성공');
        Cookies.remove('refreshToken');
        dispatch(setAccessToken(null));
        navigate('/login');
      } else {
        console.error('로그아웃 오류:', response.data.error.message);
      }
    } catch(error) {
      console.error('API Request Error:', error);
    }
  }

  return (
    <div style={appBarStyle}>
      <Link style={imgContainerStyle} to="/">
        <img style={imgStyle} src={process.env.PUBLIC_URL + '/assets/Logo/MoaLogo.png'} alt="로고" />
      </Link>
      <div>
        {Cookies.get('refreshToken') ? (
          <button style={logoutButtonStyle} onClick={handleLogout}>로그아웃</button>
        ) : null
        }
      </div>
    </div>
  );
}

export default AppBar;