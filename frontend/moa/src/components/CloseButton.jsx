import React from 'react';

function CloseButton(props) {
  return (
    <div>
      <button onClick={props.onClose}>닫기</button>
    </div>
  );
}

export default CloseButton;
