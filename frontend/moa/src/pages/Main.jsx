import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import AppBar from '../components/AppBar';
import MainArea from '../components/MainArea';
import BottomBar from '../components/BottomBar';

const mainPageStyle = {
  display: 'flex',
  flexDirection: 'column',
  minHeight: '100vh',
};

const mainAreaContainerStyle = {
  // marginBottom: '64px',
};

const bottomBarContainerStyle = {
  position: 'fixed',
  bottom: '0',
  left: '0',
  right: '0',
  width: '100%',
  boxSizing: 'border-box',
  transition: 'bottom 0.3s ease', // 트랜지션 효과 추가
};

function Main(props) {
  const isLoggedIn = props.inLoggedIn;
  const [isBottomBarVisible, setBottomBarVisible] = useState(false);

  const toggleBottomBar = () => {
    setBottomBarVisible(!isBottomBarVisible);
  };

  return (
    <div style={mainPageStyle}>
      <AppBar />
      {/* 첫 화면 이동을 위한 버튼 */}
      <div>
        <Link to="/intro">
          <button>첫 화면으로 이동</button>
        </Link>
      </div>
      <div>
        <p>안녕, User!</p>
      </div>
      <div style={mainAreaContainerStyle}>
        <MainArea />
      </div>
      {/* bottombar */}
      <div
        style={{
          ...bottomBarContainerStyle,
          bottom: isBottomBarVisible ? '0' : '-56px', // 나타날 때와 숨길 때의 위치 조절
        }}
        onClick={toggleBottomBar}
      >
        <BottomBar />
      </div>
    </div>
  );
}

export default Main;
