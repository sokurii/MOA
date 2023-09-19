import React from 'react';

function MyTalk({ talk }) {

  return (
    <div className="my-talk-area" style={{ backgroundColor: 'green', color: 'white' }}>
      <li>
        { talk }
      </li>
    </div>
  );
}

export default MyTalk;