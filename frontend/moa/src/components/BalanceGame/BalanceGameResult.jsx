import React from 'react';

import MenuHeader from '../ETC/MenuHeader';
import ReactionChoice from './ReactionChoice';

const resultStyle = {
  minHeight: '100vh',
};

const resultLabelStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '50%',
  borderRadius: '20px',
  background: 'white',
  margin: '10px auto',
  color: '#B88CD3',
  fontSize: '30px',
  fontFamily: 'Ganpan',
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
};

const buttonContainerStyle = {
  height: '100px',
  width: '90%',
  borderRadius: '18px',
  margin: '20px auto',
  background: 'white',
  display: 'flex',
  justifyContent: 'center', 
  alignItems: 'center',
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
};

const leftContainerStyle = {
  display: 'flex',
  justifyContent: 'center', 
  alignItems: 'center',
  height: '100px',
  width: '45%',
  borderTopLeftRadius: '18px',
  borderBottomLeftRadius: '18px',
};

const rightContainerStyle = {
  display: 'flex',
  justifyContent: 'center', 
  alignItems: 'center',
  height: '100px',
  width: '45%',
  borderTopRightRadius: '18px',
  borderBottomRightRadius: '18px',
};

const vsStyle = {
  width: '10%',
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

function BalanceGameResult({ balanceGameId, balanceGameList, selectedOptions }) {
  return (
    <div style={resultStyle}>
      <MenuHeader title='밸런스 게임' />

      <div style={resultLabelStyle}>
        게임 결과
      </div>

      {balanceGameList.map((list, index) => {
        const selectedOption = selectedOptions[index];
        const leftStyle = {
          ...leftContainerStyle,
          background: selectedOption === list.balanceGameOne ? '#B88CD3' : 'transparent',
          color: selectedOption === list.balanceGameOne ? 'white' : 'black',
        };

        const rightStyle ={
          ...rightContainerStyle,
          background: selectedOption === list.balanceGameTwo ? '#B88CD3' : 'transparent',
          color: selectedOption === list.balanceGameTwo ? 'white' : 'black',
        }

        return (
          <div style={buttonContainerStyle}>
            <div style={leftStyle}>
              {list.balanceGameOne}
            </div>
            <div style={vsStyle}>
              <span style={vStyle}>V</span>
              <span style={sStyle}>S</span>
            </div>
            <div style={rightStyle}>
              {list.balanceGameTwo}
            </div>
          </div>
        );
      })}

      {/* 밸런스 게임 반응 */}
      <ReactionChoice
        balanceGameId={balanceGameId}
      />
      <hr />
    </div>
  );
}

export default BalanceGameResult;