import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { userApi } from '../../api/userApi';
import Cookies from 'js-cookie';

import { setIsForeigner, useAppDispatch } from '../../store';
import { setAccessToken, setIsMatching } from '../../store';
import { setUserInfo } from '../../store/userInfo';

import Profile from '../Profile';

const appBarStyle = {
  background: 'white',
  display: 'flex',
  justifyContent: 'space-between',
  marginBottom: '10px',
  alignItems: 'center',
  boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
  height: '7.5625rem',
  maxWidth: '412px',
  position: 'relative', // 모달 애니메이션을 위한 설정
};

const imgContainerStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
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

const profileButtonStyle = {
  cursor: 'pointer',
};

const modalContainerStyle = {
  position: 'absolute', // 모달 위치 설정
  top: '-100%', // 모달이 처음에 위로 숨겨져 있음
  left: 0,
  right: 0,
  zIndex: 999,
  transition: 'top 0.3s ease-in-out', // 애니메이션 설정
};

function AppBar(props) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

  // 프로필 모달 열기 함수
  const openProfileModal = () => {
    setIsProfileModalOpen(true);
  };

  // 프로필 모달 닫기 함수
  const closeProfileModal = () => {
    setIsProfileModalOpen(false);
  };

  // 로그아웃 핸들러 함수
  const handleLogout = () => {
    Cookies.remove('refreshToken');
    localStorage.removeItem('accessToken');
    dispatch(setAccessToken(null));
    dispatch(setIsMatching(null));
    dispatch(setIsForeigner(null));
    dispatch(setUserInfo(null));

    if (!Cookies.get('refreshToken')) {
      alert('로그아웃 되었습니다');
      window.location.reload();
      navigate('/login');
    } else {
      console.log('로그아웃 오류 발생');
    }
  };

  // 프로필 모달이 열리거나 닫힐 때 모달 위치를 조절하는 효과를 위한 useEffect
  useEffect(() => {
    const modalContainer = document.getElementById('modal-container');
    if (modalContainer) {
      modalContainer.style.top = isProfileModalOpen ? '0' : '-100%';
    }
  }, [isProfileModalOpen]);

  return (
    <div style={appBarStyle}>
      <div>
        {Cookies.get('refreshToken') ? (
          <button style={logoutButtonStyle} onClick={handleLogout}>
            로그아웃
          </button>
        ) : null}
      </div>
      <Link style={imgContainerStyle} to="/">
        <img
          style={imgStyle}
          src={process.env.PUBLIC_URL + '/assets/Logo/MoaLogo.png'}
          alt="로고"
        />
      </Link>
      <div style={profileButtonStyle} onClick={openProfileModal}>
        <img
          src={process.env.PUBLIC_URL + '/assets/Logo/Profile.png'}
          alt="프로필"
        />
      </div>
      {isProfileModalOpen && (
        <div
          id="modal-container" // 모달 컨테이너의 ID 설정
          style={{
            ...modalContainerStyle, // 다른 스타일 그대로 유지하면서 top을 조절
          }}
        >
          <Profile onClose={closeProfileModal}/>
        </div>
      )}
      {isProfileModalOpen && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0, 0, 0, 0.5)',
            transition: 'opacity 0.3s ease-in-out',
            zIndex: 998,
            opacity: isProfileModalOpen ? 1 : 0,
          }}
          onClick={closeProfileModal}
        ></div>
      )}
    </div>
  );
}

export default AppBar;
