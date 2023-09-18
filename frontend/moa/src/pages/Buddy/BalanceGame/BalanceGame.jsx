import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';

import BackButton from '../../../components/BackButton';
import BalanceGameItem from '../../../components/BalanceGame/BalanceGameItem';
import PopularBalanceGameItem from '../../../components/PopularBalanceGameItem';

function BalanceGame(props) {
  const [balanceGames, setBalanceGames] = useState([
    { id : 1, title: '제목1', username: '유저1', time: 30,
      balanceGameList : [
        { order : 1, left : 'A', right : 'B' },
        { order : 2, left : 'C', right : 'D' },
        { order : 3, left : 'E', right : 'F' },
        { order : 4, left : 'G', right : 'H' },
        { order : 5, left : 'I', right : 'J' },
      ],
    },
    { id : 2, title: '제목2', username: '유저2', time: 60,
      balanceGameList : [
        { order : 1, left : 'ㄱ', right : 'ㄴ' },
        { order : 2, left : 'ㄷ', right : 'ㄹ' },
        { order : 3, left : 'ㅁ', right : 'ㅂ' },
        { order : 4, left : 'ㅅ', right : 'ㅇ' },
        { order : 5, left : 'ㅈ', right : 'ㅊ' },
      ],
    },
    { id : 3, title: '제목3', username: '유저3', time: 90,
      balanceGameList : [
        { order : 1, left : 'ㄱ', right : 'ㄴ' },
        { order : 2, left : 'ㄷ', right : 'ㄹ' },
        { order : 3, left : 'ㅁ', right : 'ㅂ' },
      ],
    },
  ]);

  const [popularBalanceGames, setPopularBalanceGames] = useState([
    { id : 1, title: '제목1', username: '유저1', time: 30,
      balanceGameList : [
        { order : 1, left : 'A', right : 'B' },
        { order : 2, left : 'C', right : 'D' },
        { order : 3, left : 'E', right : 'F' },
        { order : 4, left : 'G', right : 'H' },
        { order : 5, left : 'I', right : 'J' },
      ],
    },
    { id : 3, title: '제목3', username: '유저3', time: 90,
      balanceGameList : [
        { order : 1, left : 'ㄱ', right : 'ㄴ' },
        { order : 2, left : 'ㄷ', right : 'ㄹ' },
        { order : 3, left : 'ㅁ', right : 'ㅂ' },
      ],
    },
  ]);

  const navigate = useNavigate();

  const handleBalanceGameClick = (balanceGame) => {
    navigate(`/buddy/balancegame/${balanceGame.id}`, {
      state: { balanceGame }, // 밸런스게임 데이터를 state에 전달
    });
  };

  return (
    <div>
      <BackButton />
      <p>밸런스 게임</p>

      <div>
        <h3>인기 밸런스 게임</h3>
        {popularBalanceGames.map((popularBalanceGame, index) => {
          const rounds = popularBalanceGame.balanceGameList.length;
          return (
            <div key={index} onClick={() => handleBalanceGameClick(popularBalanceGame)}>
              <PopularBalanceGameItem 
                title={popularBalanceGame.title}
                username={popularBalanceGame.username}
                rounds={rounds}
              />
            </div>
          )
        })}
      </div>

      <br />
      <hr />
      <br />

      <div>
        <h3>밸런스 게임 목록</h3>
        <div>
          <Link to="/buddy/balancegame/create">
            <button>생성하기</button>
          </Link>
        </div>
        {balanceGames.map((balanceGame, index) => {
          const rounds = balanceGame.balanceGameList.length;
          return (
            <div key={index} onClick={() => handleBalanceGameClick(balanceGame)}>
              <BalanceGameItem 
                title={balanceGame.title}
                username={balanceGame.username}
                rounds={rounds}
              />
            </div>
          )
        })}
      </div>
    </div>
  );
}

export default BalanceGame;