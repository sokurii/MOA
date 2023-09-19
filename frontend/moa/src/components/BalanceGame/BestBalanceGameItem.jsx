import React, { useState, useEffect } from 'react';

import { balanceGameApi } from '../../api/balanceGameApi';

function BestBalanceGameItem({ balanceGameId, balanceGameTitle }) {
  const [round, setRound] = useState(0);

  useEffect(() => {
    balanceGameApi.getBalanceGameDetail(balanceGameId)
    .then((response) => {
      const res = response.data.response;
      const gameList = res.balanceGameList;
      setRound(gameList.length);
    })
    .catch((error) => {
      console.log('상세 밸런스게임 조회 에러 발생');
      console.error(error);
    });

  }, [balanceGameId, balanceGameTitle]);

  return (
    // 세로로 나열
    <div>
      <div>
        <div>
          <h2>{ balanceGameTitle } </h2>
          <h4>{ round }라운드 </h4>
        </div>
      </div>
      <hr />
    </div>
  );
}

export default BestBalanceGameItem;