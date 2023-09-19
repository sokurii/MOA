import React from 'react';

function OpponentTalk({ talk }) {
  return (
    <div>
      <div className="opponent-talk-area" style={{ backgroundColor: 'lightgreen', }}>
        <li>
          { talk }
        </li>
      </div>
    </div>
  );
}

export default OpponentTalk;