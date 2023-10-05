import React from 'react';

const opponentTalkStyle = {
  display: 'flex',
  margin: '5px',
  padding: '10px',
  width: '75%',
  background: '#B4E4FF',
  borderRadius: '18px',
  textAlign: 'left',
  boxShadow: '0px 4px 4px rgba(128.33, 106.45, 128.78, 0.10)',
}

function OpponentTalk({ talk }) {
  return (
    <div>
      <div className="opponent-talk-area" style={opponentTalkStyle}>
        { talk }
      </div>
    </div>
  );
}

export default OpponentTalk;