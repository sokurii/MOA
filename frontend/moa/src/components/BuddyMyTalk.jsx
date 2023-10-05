import React from 'react';

const myTalkStyle = {
  margin: '5px',
  padding: '10px',
  width: '60%',
  background: '#B88CD3',
  color: 'white',
  borderRadius: '18px',
  textAlign: 'right',
  boxShadow: '0px 4px 4px rgba(128.33, 106.45, 128.78, 0.10)',
  fontSize: '20px',
};
  
const myTalkWrapperStyle = {
  display: 'flex',
  justifyContent: 'flex-end',
};

function BuddyMyTalk({ talk }) {
  return (
    <div style={myTalkWrapperStyle}>
      <div className="my-talk-area" style={myTalkStyle}>
        {talk}
      </div>
    </div>
  );
}

export default BuddyMyTalk;