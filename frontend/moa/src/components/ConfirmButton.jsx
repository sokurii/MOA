import React from 'react';

function ConfirmButton({text, onClick}) {
  return (
    <button onClick={onClick}>
      {text}
    </button>
  );
}

export default ConfirmButton;