import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { userApi } from '../api/userApi';
import Cookies from 'js-cookie';

function Intro(props) {
  const navigate = useNavigate();

  // 로그아웃 핸들러 함수
  const handleLogout = async () => {
    try{
      const response = await userApi.logout();

      if (response.data.success){
        console.log('로그아웃 성공');
        Cookies.remove('refreshToken');

        navigate('/login');
      } else {
        console.error('로그아웃 오류:', response.data.error.message);
      }
    } catch(error) {
      console.error('API Request Error:', error);
    }
  }


  return (
    <div>
      <p>
        Intro Page
      </p>

      <div>
        {Cookies.get('refreshToken') ? (
          <button onClick={handleLogout}>로그아웃</button>
        ) : (
          <>
          <Link to="/login">
            <button>로그인</button>
          </Link>
          <Link to="/signup">
            <button>회원가입</button>
          </Link>
          </>
        )}
      </div>

      <hr />
      
      {/* 메인페이지 이동을 위해 임시로 만든 버튼 */}
      <div>
        <Link to="/">
          <button>메인페이지로 이동</button>
        </Link>
      </div>
    </div>
  );
}

export default Intro;