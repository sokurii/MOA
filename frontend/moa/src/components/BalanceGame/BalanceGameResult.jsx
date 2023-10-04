import React from 'react';

import MenuHeader from '../ETC/MenuHeader';
import ReactionChoice from './ReactionChoice';

function BalanceGameResult({ balanceGameId, selectedOptions }) {
  return (
    <div>
      <MenuHeader title='밸런스 게임 결과' />

      {/* 테이블 형태로 만들고 싶음 */}
      {selectedOptions.map((option, index) => {
        return (
          <div key={index}>
            <h4>{option}</h4>
          </div>
        )
      })}

      {/* 스코어보드 */}
      <div>
        <h4>0 / {selectedOptions.length}</h4>
        <p>적절한 멘트</p>
      </div>
      <hr />

      {/* 밸런스 게임 반응 */}
      <ReactionChoice
        balanceGameId={balanceGameId}
      />
      <hr />
    </div>
  );
}

export default BalanceGameResult;