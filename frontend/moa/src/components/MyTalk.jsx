import React from 'react';

const myTalkStyle = {
  margin: '5px',
  padding: '10px',
  width: '75%',
  backgroundColor: 'green',
  color: 'white',
  borderRadius: '5px',
  textAlign: 'right',
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