import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useLocation } from 'react-router-dom';

import { balanceGameApi } from '../../../api/balanceGameApi';

import BackButton from '../../../components/BackButton';
import BuddyChatArea from '../../../components/BalanceGame/BuddyChatArea';
import BalanceGameModal from '../../../components/BalanceGame/BalanceGameModal';

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
    <div>
      <BackButton />
      
      <br />
      {/* 수정 및 삭제 버튼 */}
      <div>
        <button onClick={() => handleUpdateBalanceGameClick()}>수정하기</button>
        <button onClick={deleteBalanceGame}>삭제하기</button>
      </div>

      <div>
        <h1>제목 : { title }</h1>

        {/* 밸런스 게임 평가 */}
        <div>
          <div>
            😍 : { goodCount }
          </div>
          <div>
            😐 : { normalCount }
          </div>
          <div>
            😥 : { badCount }
          </div>
        </div>

        {/* 밸런스 게임 정보 */}
        <div>
          라운드 수 : { balanceGameList.length }
        </div>
        <div>
          제한시간 : 라운드 당 { time } 초
        </div>
      </div>

      {/* 버디 및 유학생 이름 */}
      <div>
        <div>
          <h5>버디 이름</h5>
        </div>
        <div>
          <h5>유학생 이름</h5>
        </div>
      </div>

      {/* 실시간 채팅 화면 */}
      <BuddyChatArea />

      <hr />

      <button onClick={handleStartClick}>시작하기</button>

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