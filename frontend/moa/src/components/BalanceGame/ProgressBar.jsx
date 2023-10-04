import React from 'react';

const progressBarContainerStyle = {
  margin: '10px',
  display: 'flex',
  // width: '100%',
  alignItems: 'center',
};

const progressBarStyle = {
  height: '10px',
  width: '100%',
  borderRadius: '18px',
  backgroundColor: '#B88CD3',
  transition: 'width 1s linear',
};

const timeStyle = {
  margin: '10px',
};

function ProgressBar({ remainingTime, progress }) {
  return (
    <div style={progressBarContainerStyle}>
      <div style={timeStyle}>{ remainingTime }</div>
      <div className="progress-bar" style={{ ...progressBarStyle, width: `${progress}%` }}></div>
    </div>
  );
}

export default ProgressBar;
