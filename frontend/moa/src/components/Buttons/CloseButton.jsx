import React from 'react';

function CloseButton({ onClose }) {
  return (
    <div>
      <button onClick={onClose}>닫기</button>
    </div>
  );
}

export default CloseButton;
