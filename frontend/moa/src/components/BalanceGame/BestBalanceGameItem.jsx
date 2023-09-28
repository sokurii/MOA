import React, { useState, useEffect } from 'react';

import { balanceGameApi } from '../../api/balanceGameApi';

const bestBalanceGameItemStyle = {
  margin: '10px',
  padding: '20px',
  backgroundColor: 'white',
  borderRadius: '16px',
  boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',

};

const timeContainerStyle = {
  display: 'flex',
};

const timeStyle = {
  display: 'flex',
  justifyContent: 'space-evenly',
  padding: '5px 10px',
  borderRadius: '60px',
  background: '#F6E8F5',
};

const titleContainerStyle = {

};

const titleStyle = {
  fontSize: '20px',
  fontWeight: '700',
};

const reactionContainerStyle = {
  display: 'flex',
  justifyContent: 'space-evenly',
};

const reactionStyle = {
  display: 'flex',
  alignItems: 'center', // 세로 중앙 정렬
  margin: '0', // margin 제거
  padding: '5px 10px',
  background: '#F6E8F5',
  borderRadius: '60px',
};

function BestBalanceGameItem({ balanceGameId, balanceGameTitle }) {
  const [round, setRound] = useState(0);
  const [time, setTime] = useState(null);
  const [goodCount, setGoodCount] = useState(null);
  const [normalCount, setNormalCount] = useState(null);
  const [badCount, setBadCount] = useState(null);

  useEffect(() => {
    balanceGameApi.getBalanceGameDetail(balanceGameId)
    .then((response) => {
      const res = response.data.response;
      const gameList = res.balanceGameList;
      setRound(gameList.length);
      setTime(res.balanceGameTime);
      setGoodCount(res.goodCount);
      setNormalCount(res.normalCount);
      setBadCount(res.badCount);
    })
    .catch((error) => {
      console.log('상세 밸런스게임 조회 에러 발생');
      console.error(error);
    });

  }, [balanceGameId, balanceGameTitle]);

  return (
    // 세로로 나열
    <div style={bestBalanceGameItemStyle}>
      <div style={timeContainerStyle}>
        <div style={timeStyle}>
          <p style={{ margin: '0', padding: '0 5px' }}>{ time }초</p>
          <p style={{ margin: '0', padding: '0 5px' }}>{ round }라운드 </p>
        </div>
      </div>
      <div style={titleContainerStyle}>
        <p style={titleStyle}>{ balanceGameTitle } </p>
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
  );
}

export default BestBalanceGameItem;