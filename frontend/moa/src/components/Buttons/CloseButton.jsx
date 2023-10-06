import React from 'react';

const buttonStyle = {
  fontSize: '20px',
  fontFamily: 'Ganpan',
  border: 'none',
  background: 'transparent',
  cursor: 'pointer',
};

function CloseButton({ onClose }) {
  return (
    <div>
      <button style={buttonStyle} onClick={onClose}>X</button>
    </div>
  );
}

export default CloseButton;
