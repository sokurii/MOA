import React from 'react';
import store from '../../store';

const state = store.getState();

function MatchingIntro(props) {
  const isForeigner = state.isForeigner;
  
  return (
    <div>
      {isForeigner ? (
        <span>반가워요! 멋진 한국인 친구 버디를 만나보세요</span>
      ) : (
        <span>한국을 좋아하는 외국인 친구의 버디가 되어보세요</span>
      )}
    </div>
  );
}

export default MatchingIntro;