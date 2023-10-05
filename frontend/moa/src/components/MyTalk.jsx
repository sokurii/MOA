import React from 'react';

const myTalkStyle = {
  margin: '5px',
  padding: '10px',
  width: '75%',
  backgroundColor: 'skyblue',
  borderRadius: '18px',
  textAlign: 'right',
  boxShadow: '0px 4px 4px rgba(128.33, 106.45, 128.78, 0.10)',
};

const myTalkWrapperStyle = {
  display: 'flex',
  justifyContent: 'flex-end',
};

function MyTalk({ talk }) {
  return (
    <div style={myTalkWrapperStyle}>
      <div className="my-talk-area" style={myTalkStyle}>
        {talk}
      </div>
    </div>
  );
}

export default MyTalk;