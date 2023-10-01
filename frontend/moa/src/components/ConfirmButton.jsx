import React from 'react';

const buttonStyle = {
  background: 'linear-gradient(104deg, #C4DD7C 0%, #A6CC38 100%)',
  color: 'white',
  fontSize: '20px',
  fontWeight: '700',
  width: '100%',
  border: 'none',
  borderRadius: '18px',
  margin: '10px 5px',
  padding: '12px 0',
};

function ConfirmButton({text, onClick}) {
  return (
    <button style={buttonStyle} onClick={onClick}>
      {text}
    </button>
  );
}

export default ConfirmButton;