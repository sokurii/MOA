import React from 'react';

const progressBarDivStyle = {
  height: '10px',
  width: '100%',
  background: 'linear-gradient(104deg, #C4DD7C 0%, #A6CC38 100%)',
  margin: '0 5px',
}

function ProgressBarDiv(props) {
  return (
    <div style={progressBarDivStyle}>
    </div>
  );
}

export default ProgressBarDiv;