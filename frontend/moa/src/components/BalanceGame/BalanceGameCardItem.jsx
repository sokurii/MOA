import React from 'react';

const balanceGameCardStyle = {
  margin: '10px auto',
  padding: '10px',
  width: '85%',
  background: 'white',
  borderRadius: '10px',
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
};

const inputContainerStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
};

const inputStyle = {
  margin: '10px auto',
  padding: '10px 20px',
  width: '80%',
  height: '20px',
  backgroundColor: 'white',
  borderRadius: '10px',
  border: 'none',
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
};

const vsContainerStyle = {
  margin: '0 10px',
};

const vStyle = {
  color: '#E57373',
  fontFamily: 'Ganpan',
  fontSize: '20px',
  fontWeight: '400',
};

const sStyle = {
  color: '#0980D0',
  fontFamily: 'Ganpan',
  fontSize: '20px',
  fontWeight: '400',
};

function BalanceGameCardItem(props) {
  const { index, updateBalanceGameList } = props;

  // input 입력값을 상위 컴포넌트로 보내기
  const handleInputChange = (side, e) => {
    const value = e.target.value;
    updateBalanceGameList(index, side, value);
  };

  return (
    <div style={balanceGameCardStyle}>
      <div style={inputContainerStyle}>
        <input
          style={inputStyle}
          type="text"
          name="left"
          id="left"
          onChange={(e) => handleInputChange('balanceGameOne', e)}
        />
        <p style={vsContainerStyle}>
          <span style={vStyle}>V</span>
          <span style={sStyle}>S</span>
        </p>
        <input
          style={inputStyle}
          type="text"
          name="right"
          id="right"
          onChange={(e) => handleInputChange('balanceGameTwo', e)}
        />
      </div>
    </div>
  );
}

export default BalanceGameCardItem;
