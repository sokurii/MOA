import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useLocation } from 'react-router-dom';

import { balanceGameApi } from '../../../api/balanceGameApi';

import MenuHeader from '../../../components/ETC/MenuHeader';
import BuddyChatArea from '../../../components/BalanceGame/BuddyChatArea';
import BalanceGameModal from '../../../components/BalanceGame/BalanceGameModal';

const balanceGameDetailStyle = {
  backgroundImage: `
    url(${process.env.PUBLIC_URL}/assets/Background/buddy_background.png)
  `,
  backgroundSize: 'cover', // 배경 이미지 크기 조절
  backgroundRepeat: 'no-repeat', // 배경 이미지 반복 없음
  backgroundPosition: 'center', // 배경 이미지 중앙 정렬
  width: '100%', // 화면 전체 너비를 차지하도록 설정
  height: '100vh', // 화면 전체 높이를 차지하도록 설정
};

const gameInfoStyle = {
  margin: '15px auto',
};

const titleContainerStyle = {
  margin: '0 auto',
  padding: '15px 0',
  background: '#B88CD3',
  borderRadius: '10px',
  width: '90%',
  color: 'white',
  fontSize: '18px',
  fontWeight: '700',
};

const roundTimeContainerStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  padding: '0 15px',
  marginTop: '10px',
  marginBottom: '10px',
};

const whiteDivStyle = {
  background: 'white',
  margin: '5px 6px',
  padding: '10px 5px',
  borderRadius: '10px',
  width: '50%',
  fontSize: '18px',
  fontWeight: '600',
  color: '#8C689D',
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
};

const reactionContainerStyle = {
  margin: '0 auto',
  padding: '10px 0',
  display: 'flex',
  justifyContent: 'space-evenly',
  width: '90%',
  background: 'white',
  borderRadius: '10px',
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
};

const reactionStyle = {
  display: 'flex',
  alignItems: 'center', // 세로 중앙 정렬
  margin: '0', // margin 제거
  padding: '5px 10px',
  background: '#F6E8F5',
  borderRadius: '60px',
  fontSize: '16px',
  fontWeight: '700',
};

const userInfoStyle = {
  margin: '15px auto',
};

const readyStyle = {
  margin: '10px 20px',
  display: 'flex',
  fontSize: '20px',
  fontWeight: '700',
};

const nameContainerStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  padding: '0 15px',
};

const buttonContainerStyle = {
  margin: '10px auto',
};

const buttonStyle = {
  padding: '15px 10px',
  width: '90.1%',
  color: 'white',
  fontSize: '18px',
  fontWeight: '700',
  border: 'none',
  borderRadius: '18px',
  background: 'linear-gradient(184deg, #ECC2F7 7%, #B17AD3 82%)',
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
};

function BalanceGameDetail(props) {
  const location = useLocation();
  const balanceGame = location.state.balanceGame;
  const balanceGameId = balanceGame.balanceGameId;
  const [isModalOpen, setIsModalOpen] = useState(false);

  
  const handleStartClick = () => {
    setIsModalOpen(true);
  };
  
  const navigate = useNavigate();
  
  // 밸런스 게임 수정 페이지 이동
  const handleUpdateBalanceGameClick = () => {
    navigate(`/buddy/balancegame/${balanceGameId}/update`, {
      state: { balanceGame }, // 밸런스게임 데이터를 state에 전달
    });
  };

  // 밸런스 게임 삭제
  const deleteBalanceGame = () => {
    balanceGameApi.deleteBalanceGame(balanceGameId)
    .then((response) => {
      alert('게임이 삭제되었습니다.');
      navigate('/buddy/balancegame');
    })
    .catch((error) => {
      console.log('밸런스 게임 삭제 에러 발생');
      console.log(error);
    })
  }
  
  // 밸런스 게임 목록
  const [title, setTitle] = useState('');
  const [time, setTime] = useState(0);
  const [balanceGameList, setBalanceGameList] = useState([]);
  const [goodCount, setGoodCount] = useState(0);
  const [normalCount, setNormalCount] = useState(0);
  const [badCount, setBadCount] = useState(0);

  const [dataLoaded, setDataLoaded] = useState(false);

  useEffect(() => {
    balanceGameApi.getBalanceGameDetail(balanceGameId)
    .then((response) => {
      const res = response.data.response;
      console.log(res);
      setTitle(res.balanceGameTitle);
      setTime(res.balanceGameTime);
      setBalanceGameList(res.balanceGameList);
      setGoodCount(res.goodCount);
      setNormalCount(res.normalCount);
      setBadCount(res.badCount);
    })
    .catch((error) => {
      console.log('상세 밸런스게임 조회 에러 발생');
      console.error(error);
    });

    setDataLoaded(true);

  }, [dataLoaded]);

  return (
    <div style={balanceGameDetailStyle}>
      <MenuHeader title='밸런스 게임' />

      {/* 게임 정보 */}
      <div style={gameInfoStyle}>
        <div style={titleContainerStyle}>
          <span>{ title }</span>
        </div>
        <div style={roundTimeContainerStyle}>
          <div style={whiteDivStyle}>
            <span>{ balanceGameList.length }라운드</span>
          </div>
          <div style={whiteDivStyle}>
            <span>{ time }초</span>
          </div>
        </div>
        <div style={reactionContainerStyle}>
          <div style={reactionStyle}>
            <p style={{ margin: '0' }}>😍 { goodCount }</p>
          </div>
          <div style={reactionStyle}>
            <p style={{ margin: '0' }}>😐 { normalCount }</p>
          </div>
          <div style={reactionStyle}>
            <p style={{ margin: '0' }}>😥 { badCount }</p>
          </div>
        </div>
      </div>
      
      {/* 수정 및 삭제 버튼 */}
      <div>
        <button onClick={() => handleUpdateBalanceGameClick()}>수정하기</button>
        <button onClick={deleteBalanceGame}>삭제하기</button>
      </div>

      {/* 유저 정보 */}
      <div style={userInfoStyle}>
        <span style={readyStyle}>게임을 준비하세요</span>
        <div style={nameContainerStyle}>
          <div style={whiteDivStyle}>
            <span>버디 이름</span>
          </div>
          <div style={whiteDivStyle}>
            <span>유학생 이름</span>
          </div>
        </div>
      </div>

      {/* 실시간 채팅 화면 */}
      {/* <BuddyChatArea /> */}

      <div style={buttonContainerStyle}>
        <button style={buttonStyle} onClick={handleStartClick}>시작하기</button>
      </div>

      {isModalOpen &&
        <BalanceGameModal
          balanceGameId={balanceGameId}
          balanceGameList={balanceGameList}
          time={time}
        />}

    </div>
  );
}

export default BalanceGameDetail;