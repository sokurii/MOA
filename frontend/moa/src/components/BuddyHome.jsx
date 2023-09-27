import React from 'react';
import { Link } from 'react-router-dom';

import BackButton from './BackButton';

const linkStyle = {
  textDecoration: 'none', // 밑줄 제거
  color: 'inherit', // 링크 색상을 상위 요소에서 상속
};

const buddyHomeStyle = {
  padding: '30px',
  backgroundImage: `
    url(${process.env.PUBLIC_URL}/assets/Background/buddy_background.png)
  `,
  backgroundSize: 'cover', // 배경 이미지 크기 조절
  backgroundRepeat: 'no-repeat', // 배경 이미지 반복 없음
  backgroundPosition: 'center', // 배경 이미지 중앙 정렬
};

const diaryButtonStyle = {
  background: 'linear-gradient(180deg, #FDE5FF 0%, #F9E1BD 100%)',
  borderRadius: '18px',
  margin: '40px auto',
  padding: '40px',
  boxShadow: '0px 10px 6px rgba(0, 0, 0, 0.1)',
};

const buttonTitleStyle = {
  display: 'flex',
  color: '#284657',
  fontSize: '24px',
  fontWeight: '700',
};

const buttonContentStyle = {
  display: 'flex',
  textAlign: 'left',
  color: '#284657',
  fontSize: '18px',
  fontWeight: '700',
};

const balanceGameButtonStyle = {
  padding: '40px',
  background: 'linear-gradient(180deg, #FDE5FF 0%, #F9E1BD 100%)',
  borderRadius: '18px',
  margin: '40px auto',
  padding: '40px',
  boxShadow: '0px 10px 6px rgba(0, 0, 0, 0.1)',
};

const koreaTourButtonStyle = {
  padding: '40px',
  background: 'linear-gradient(180deg, #FDE5FF 0%, #F9E1BD 100%)',
  borderRadius: '18px',
  margin: '40px auto',
  padding: '40px',
  boxShadow: '0px 10px 6px rgba(0, 0, 0, 0.1)',
};

function BuddyHome(props) {
  return (
    <div style={buddyHomeStyle}>
      <Link to="/buddy/exchangediary"style={linkStyle}>
        <div className="diary-button" style={diaryButtonStyle}>
          <p style={buttonTitleStyle}>버디와 교환일기</p>
          <p style={buttonContentStyle}>
            오늘 하루 어떤 일이 있었나요?
            <br />
            버디와 하루를 기록하고 공유해요
          </p>
        </div>
      </Link>

      <Link to="/buddy/balancegame"style={linkStyle}>
        <div className="balance-game-button" style={balanceGameButtonStyle}>
          <p style={buttonTitleStyle}>밸런스게임</p>
          <p style={buttonContentStyle}>설명</p>
        </div>
      </Link>

      <Link to="/buddy/koreatour"style={linkStyle}>
        <div className="korea-tour-button" style={koreaTourButtonStyle}>
          <p style={buttonTitleStyle}>랜선여행</p>
          <p style={buttonContentStyle}>설명</p>
        </div>
      </Link>
    </div>
  );
}

export default BuddyHome;