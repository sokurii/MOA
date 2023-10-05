import React from 'react';
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
  return (
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
  );
}

export default BottomBar;