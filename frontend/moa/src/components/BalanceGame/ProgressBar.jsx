import React from 'react';

const progressBarContainerStyle = {
  width: '100%',
};

const progressBarStyle = {
  height: '10px',
  backgroundColor: 'green',
  transition: 'width 1s linear',
};

function ProgressBar({ remainingTime, progress }) {
  return (
    <div style={progressBarContainerStyle}>
      <div>
        <p>남은 시간: {remainingTime} 초</p>
        <div className="progress-bar" style={{ ...progressBarStyle, width: `${progress}%` }}></div>
      </div>
    </div>
  );
}

export default ProgressBar;
