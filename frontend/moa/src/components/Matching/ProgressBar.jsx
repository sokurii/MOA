import React from 'react';
import store from '../../store';

import ProgressBarDiv from './ProgressBarDiv';

const state = store.getState();

const progressBarContainerStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  margin: '20px 0'
};

function ProgressBar(props) {
  const isForeigner = state.isForeigner;
  const progressCount = isForeigner ? 2 : 3;

  // ProgressBarDiv를 progressCount 개수만큼 생성
  const progressBarDivs = Array.from({ length: progressCount }, (_, index) => (
    <ProgressBarDiv key={index} />
  ));

  return (
    <div style={progressBarContainerStyle}>
      {progressBarDivs}
    </div>
  );
}

export default ProgressBar;