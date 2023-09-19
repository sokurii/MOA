import React from 'react';

function BalanceGameListItem(props) {
  const { index, updateBalanceGameList } = props;

  // input 입력값을 상위 컴포넌트로 보내기
  const handleInputChange = (side, e) => {
    const value = e.target.value;
    updateBalanceGameList(index, side, value);
  };

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <input
          type="text"
          name="left"
          id="left"
          style={{ marginRight: '10px' }}
          onChange={(e) => handleInputChange('balanceGameOne', e)}
        />
        <p style={{ margin: '0 10px' }}>VS</p>
        <input
          type="text"
          name="right"
          id="right"
          onChange={(e) => handleInputChange('balanceGameTwo', e)}
        />
      </div>
    </div>
  );
}

export default BalanceGameListItem;
