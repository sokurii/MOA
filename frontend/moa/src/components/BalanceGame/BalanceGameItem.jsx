import React from 'react';

const balanceGameItemStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  margin: '20px auto',
  padding: '5px 20px',
  background: '#FCF3FB',
  borderRadius: '200px',
  boxShadow: '0px 4px 4px rgba(128.33, 106.45, 128.78, 0.10)',
};

const iconContainerStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  background: 'white',
  borderRadius: '9999px',
  width: '50px',
  height: '50px',
};

const iconStyle = {
  padding: '10px',
  background: 'white',
};

const titleContainerStyle = {
  flex: '1',
};

const titleStyle = {
  color: '#8C689D',
  fontSize: '16px',
  fontWeight: '700',
};

function BalanceGameItem({ balanceGameId, balanceGameTitle }) {

  return (
    // 가로로 나열
    <div style={balanceGameItemStyle}>
      <div style={iconContainerStyle}>
        <img
          style={iconStyle}
          src={process.env.PUBLIC_URL + '/assets/Icons/balanceGameIcon.png'}
          alt="아이콘"
        />
      </div>
      <div style={titleContainerStyle}>
        <p style={titleStyle}>{ balanceGameTitle }</p>
      </div>
    </div>
  );
}

export default BalanceGameItem;