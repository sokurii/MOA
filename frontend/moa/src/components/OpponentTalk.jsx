import React from 'react';

const opponentTalkStyle = {
  display: 'flex',
  margin: '5px',
  padding: '10px',
  width: '75%',
  backgroundColor: 'lightgreen',
  borderRadius: '5px',
  textAlign: 'left',
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