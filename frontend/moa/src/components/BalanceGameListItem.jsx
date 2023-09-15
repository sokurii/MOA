import React from 'react';

function BalanceGameListItem(props) {
  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <input type="text" name="left" id="left" style={{ marginRight: '10px' }} />
        <p style={{ margin: '0 10px' }}>vs</p>
        <input type="text" name="right" id="right" />
      </div>
    </div>
  );
}

export default BalanceGameListItem;
