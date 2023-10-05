import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const bottomBarStyle = {
  marginTop: '20px',
  padding: '20px 0',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-evenly',
  backgroundColor: 'white',
  boxShadow: '0px -4px 6px rgba(0, 0, 0, 0.1)', // 그림자 스타일
  borderTopLeftRadius: '16px',
  borderTopRightRadius: '16px',
  width: '100%',
};

function BottomBar(props) {
  const [isBottomBarVisible, setBottomBarVisible] = useState(false);

  const toggleBottomBar = () => {
    setBottomBarVisible(!isBottomBarVisible);
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
  return (
    <div
      style={{
        ...bottomBarContainerStyle,
        bottom: isBottomBarVisible ? '0' : '-56px', // 나타날 때와 숨길 때의 위치 조절
      }}
      onClick={toggleBottomBar}
    >
      <div style={bottomBarStyle}>
        <Link to="/koreanlearning">
          <img src={process.env.PUBLIC_URL + '/assets/Logo/news.png'} alt="뉴스" />
        </Link>
        <Link to="/quiz">
          <img src={process.env.PUBLIC_URL + '/assets/Logo/quiz.png'} alt="퀴즈" />
        </Link>
        <Link to="/buddy/balancegame">
          <img src={process.env.PUBLIC_URL + '/assets/Logo/balancegame.png'} alt="밸런스게임" />
        </Link>
        <Link to="/buddy/exchangediary">
          <img src={process.env.PUBLIC_URL + '/assets/Logo/diary.png'} alt="교환일기" />
        </Link>
        <Link to="/buddy/koreatour">
          <img src={process.env.PUBLIC_URL + '/assets/Logo/koreatour.png'} alt="랜선여행" />
        </Link>
      </div>
    </div>
  );
}

export default BottomBar;