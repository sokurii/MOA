import React from 'react';

function PopularBalanceGameItem(props) {
  const title = props.title;
  const username = props.username;
  const rounds = props.rounds;

  return (
    // 세로로 나열
    <div>
      <div>
        <div>
          <h2>{ title }</h2>
          <h4>{ username }</h4>
          <h6>{ rounds } 라운드</h6>
        </div>
      </div>
    </div>
  );
}

export default PopularBalanceGameItem;