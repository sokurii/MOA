import React from 'react';

function BalanceGameItem(props) {
  const title = props.title;
  const username = props.username;
  const rounds = props.rounds;

  return (
    // 가로로 나열
    <div>
      <div>
        <div>
          <h2>{ title }</h2>
          <h4>{ username }</h4>
          <h6>{ rounds } 라운드</h6>
        </div>
      </div>
      <hr />
    </div>
  );
}

export default BalanceGameItem;