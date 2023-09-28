import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';

import { balanceGameApi } from '../../../api/balanceGameApi';

import AppBar from '../../../components/AppBar';
import BalanceGameItem from '../../../components/BalanceGame/BalanceGameItem';
import BestBalanceGameItem from '../../../components/BalanceGame/BestBalanceGameItem';

const bestBalanceGameContainerStyle = {
  padding: '10px 0'
};

const titleCommentContainerStyle = {
  margin: '0 20px',
  display: 'flex',
  flexDirection: 'column',
  textAlign: 'left',
  justifyContent: 'flex-end',
};

const balanceGameStyle = {
  backgroundImage: `
    url(${process.env.PUBLIC_URL}/assets/Background/buddy_background.png)
  `,
  backgroundSize: 'cover', // 배경 이미지 크기 조절
  backgroundRepeat: 'no-repeat', // 배경 이미지 반복 없음
  backgroundPosition: 'center', // 배경 이미지 중앙 정렬
};

const balanceGameListStyle = {
  padding: '0 10px',
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
      <div style={bestBalanceGameContainerStyle}>
        <div style={titleCommentContainerStyle}>
          <p style={titleStyle}>HOT한 밸런스 게임</p>
          <p style={commentStyle}>유저들의 선택을 받은 인기 밸런스 게임을 해보세요</p>
        </div>
        <div style={balanceGameListStyle}>
          {bestBalanceGames.length === 0 ? (
            <p>인기 밸런스 게임이 없습니다.</p>
          ) : (
              bestBalanceGames.map((bestBalanceGame, index) => {
                const { balanceGameId, balanceGameTitle } = bestBalanceGame;

                return (
                  <div key={index}>
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

      <hr />

      <div>
        <div>
          <div>

          </div>
          <div>
            <Link to="/buddy/balancegame/create">
              <button>생성하기</button>
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
