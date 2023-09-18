import React from 'react';

import BackButton from '../BackButton';

function BalanceGameResult(props) {
  const selectedOptions = props.selectedOptions;
  return (
    <div>
      <h3>결과</h3>

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
      <div>
        <p>반응 Component</p>
      </div>
      <hr />
      <BackButton />
    </div>
  );
}

export default BalanceGameResult;