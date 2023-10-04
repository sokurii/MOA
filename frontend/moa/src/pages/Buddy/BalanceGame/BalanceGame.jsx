import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

import { balanceGameApi } from '../../../api/balanceGameApi';

import AppBar from '../../../components/ETC/AppBar';
import BalanceGameItem from '../../../components/BalanceGame/BalanceGameItem';
import BestBalanceGameItem from '../../../components/BalanceGame/BestBalanceGameItem';

const balanceGameContainerStyle = {
  padding: '10px 0'
};

const titleCommentContainerStyle = {
  margin: '0 20px',
  display: 'flex',
  flexDirection: 'column',
  textAlign: 'left',
  justifyContent: 'center',
};

const balanceGameStyle = {
  backgroundImage: `
    url(${process.env.PUBLIC_URL}/assets/Background/buddy_background.png)
  `,
  backgroundSize: 'cover', // 배경 이미지 크기 조절
  backgroundRepeat: 'no-repeat', // 배경 이미지 반복 없음
  backgroundPosition: 'center', // 배경 이미지 중앙 정렬
  width: '100%', // 화면 전체 너비를 차지하도록 설정
  height: '100vh', // 화면 전체 높이를 차지하도록 설정
};

const bestBalanceGameListStyle = {
  padding: '0 10px',
};

const balanceGameListStyle = {
  marginTop: '10px',
  padding: '30px 20px',
  background: 'white',
  borderRadius: '40px 40px 0 0',
};

const titleStyle = {
  display: 'block',
  margin: '0',
  fontSize: '20px',
  fontWeight: '700',
};

const commentStyle = {
  display: 'block',
  margin: '0',
  fontSize: '14px',
  fontWeight: '400',
};

const createButtonStyle = {
  background: 'linear-gradient(180deg, #FDE5FF 0%, #F9E1BD 100%)',
  border: 'none',
  margin: '10px 20px',
  padding: '10px 20px',
  borderRadius: '16px',
  cursor: 'pointer',
  boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
  fontSize: '16px',
  fontWeight: '700',
};

///////////////////////////////////////

function BalanceGame(props) {
  const [balanceGames, setBalanceGames] = useState([]);
  const [bestBalanceGames, setBestBalanceGames] = useState([]);
  const [dataLoaded, setDataLoaded] = useState(false);

  useEffect(() => {
    // 전체 밸런스 게임
    balanceGameApi
      .getBalanceGameList()
      .then((response) => {
        console.log(response.data.response);
        setBalanceGames(response.data.response);
      })
      .catch((error) => {
        console.log('전체 밸런스게임 조회 에러 발생');
        console.error(error);
      });

    // 인기 밸런스 게임
    balanceGameApi
      .getBestBalanceGameList()
      .then((response) => {
        console.log(response.data.response);
        setBestBalanceGames(response.data.response);
      })
      .catch((error) => {
        console.log('인기 밸런스게임 조회 에러 발생');
        console.error(error);
      });

    setDataLoaded(true);
  }, [dataLoaded]);

  const navigate = useNavigate();

  const handleBalanceGameClick = (balanceGame) => {
    navigate(`/buddy/balancegame/${balanceGame.balanceGameId}`, {
      state: { balanceGame }, // 밸런스게임 데이터를 state에 전달
    });
  };

  return (
    <div style={balanceGameStyle}>
      <AppBar />

      {/* 인기 밸런스 게임 */}
      <div style={balanceGameContainerStyle}>
        <div style={titleCommentContainerStyle}>
          <p style={titleStyle}>HOT한 밸런스 게임</p>
          <p style={commentStyle}>유저들의 선택을 받은 인기 밸런스 게임을 해보세요</p>
        </div>
        <div style={bestBalanceGameListStyle}>
          {bestBalanceGames.length === 0 ? (
            <p>인기 밸런스 게임이 없습니다.</p>
          ) : (
              bestBalanceGames.map((bestBalanceGame, index) => {
                const { balanceGameId, balanceGameTitle } = bestBalanceGame;

                return (
                  <div
                    key={index}
                    onClick={() => handleBalanceGameClick(bestBalanceGame)}
                  >
                    <BestBalanceGameItem
                      balanceGameId={balanceGameId}
                      balanceGameTitle={balanceGameTitle}
                    />
                  </div>
                );
              }
            )
          )}
        </div>
      </div>

      {/* 전체 밸런스 게임 */}
      <div style={balanceGameContainerStyle}>
        <div style={{ display: 'flex', justifyContent: 'space-between'}}>
          <div style={titleCommentContainerStyle}>
            <p style={titleStyle}>전체 밸런스 게임 목록</p>
            <p style={commentStyle}>더 많은 게임들을 확인할 수 있어요!</p>
          </div>
          <div>
            <Link to="/buddy/balancegame/create">
              <button style={createButtonStyle}>생성하기</button>
            </Link>
          </div>
        </div>
        <div style={balanceGameListStyle}>
          {balanceGames.length === 0 ? (
            <p>생성된 밸런스 게임이 없습니다.</p>
          ) : (
            balanceGames.map((balanceGame, index) => {
              const { balanceGameId, balanceGameTitle } = balanceGame;

              return (
                <div
                  key={index}
                  onClick={() => handleBalanceGameClick(balanceGame)}
                >
                  <BalanceGameItem
                    balanceGameId={balanceGameId}
                    balanceGameTitle={balanceGameTitle}
                  />
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}

export default BalanceGame;
