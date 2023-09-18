import React from 'react';

import BackButton from '../BackButton';

function BalanceGameResult(props) {
  return (
    <div>
      <h3>결과 화면</h3>
      <div>
        <p>결과 Component</p>
      </div>
      <div>
        <p>점수 화면 Component</p>
      </div>
      <div>
        <p>반응 Component</p>
      </div>
      <hr />
      <BackButton />
    </div>
  );
}

export default BalanceGameResult;