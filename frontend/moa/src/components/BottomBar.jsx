import React from 'react';
import { Link } from 'react-router-dom';

const bottomBarStyle = {
  marginTop: '10px',
  padding: '10px',
  display: 'flex',
  justifyContent: 'space-evenly',
  backgroundColor: 'white',
  boxShadow: '0px -4px 6px rgba(0, 0, 0, 0.1)', // 그림자 스타일
  borderTopLeftRadius: '16px',
  borderTopRightRadius: '16px',
};

function BottomBar(props) {
  return (
    <div style={bottomBarStyle}>
      <Link to="/koreanlearning">
        <img src={process.env.PUBLIC_URL + '/assets/Logo/news.png'} alt="뉴스" />
      </Link>
      <Link to="/quiz">
        <img src={process.env.PUBLIC_URL + '/assets/Logo/quiz.png'} alt="퀴즈" />
      </Link>
      <Link to="/chatting">
        <img src={process.env.PUBLIC_URL + '/assets/Logo/chat.png'} alt="채팅" />
      </Link>
      <Link to="/buddy">
        <img src={process.env.PUBLIC_URL + '/assets/Logo/buddy.png'} alt="버디" />
      </Link>
      <div>
        <img src={process.env.PUBLIC_URL + '/assets/Logo/mypage.png'} alt="프로필" />
      </div>
    </div>
  );
}

export default BottomBar;