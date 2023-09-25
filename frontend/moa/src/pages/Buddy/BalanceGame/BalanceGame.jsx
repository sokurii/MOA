import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';

import { balanceGameApi } from '../../../api/balanceGameApi';

import BackButton from '../../../components/BackButton';
import BalanceGameItem from '../../../components/BalanceGame/BalanceGameItem';
import BestBalanceGameItem from '../../../components/BalanceGame/BestBalanceGameItem';

const balanceGameListStyle = {
  margin: '10px',
  padding: '10px',
  backgroundColor: 'lightgreen',
  borderRadius: '5px',
};

function BalanceGame(props) {
  const [balanceGames, setBalanceGames] = useState([]);
  const [bestBalanceGames, setBestBalanceGames] = useState([]);
  const [dataLoaded, setDataLoaded] = useState(false);

  useEffect(() => {
    // 전체 밸런스 게임
    balanceGameApi.getBalanceGameList()
    .then((response) => {
      console.log(response.data.response);
      setBalanceGames(response.data.response);
    })
    .catch((error) => {
      console.log('전체 밸런스게임 조회 에러 발생');
      console.error(error);
    });

    // 인기 밸런스 게임
    balanceGameApi.getBestBalanceGameList()
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
    <div>
      <BackButton />
      <h2>밸런스 게임</h2>
      <div>
        <h3>인기 밸런스 게임</h3>
        <div style={balanceGameListStyle}>
          {bestBalanceGames.length === 0 ? (
            <p>인기 밸런스 게임이 없습니다.</p>
          ) : (
            bestBalanceGames.map((bestBalanceGame, index) => {
              const { balanceGameId, balanceGameTitle } = bestBalanceGame;
  
              return (
                <div key={index} onClick={() => handleBalanceGameClick(bestBalanceGame)}>
                  <BestBalanceGameItem 
                    balanceGameId={balanceGameId}
                    balanceGameTitle={balanceGameTitle}
                  />
                </div>
              );
            })
          )}
        </div>
      </div>

      <hr />

      <div>
        <h3>밸런스 게임 목록</h3>
        <div style={balanceGameListStyle}>
          <div>
            <Link to="/buddy/balancegame/create">
              <button>생성하기</button>
            </Link>
          </div>
          {balanceGames.length === 0 ? (
            <p>생성된 밸런스 게임이 없습니다.</p>
          ) : (
            balanceGames.map((balanceGame, index) => {
              const { balanceGameId, balanceGameTitle } = balanceGame;

              return (
                <div key={index} onClick={() => handleBalanceGameClick(balanceGame)}>
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