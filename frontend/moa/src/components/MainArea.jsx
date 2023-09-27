import React, { useState, useRef } from 'react';
import LearningHome from './LearningHome';
import QuizHome from './QuizHome';
import ChattingHome from './ChattingHome';
import BuddyHome from './BuddyHome';
import MyPage from './MyPage';

const mainAreaStyle = {
  overflow: 'hidden',
  height: '100vh',
  touchAction: 'pan-y', // 세로 드래그는 화면 위로 스크롤되도록 설정
};

const slideStyle = {
  display: 'flex',
  transition: 'transform 0.3s ease',
  height: '100%',
};

function MainArea(props) {
  const [activeIndex, setActiveIndex] = useState(0);
  const components = [LearningHome, QuizHome, BuddyHome];
  const containerRef = useRef(null);
  let touchStartX = 0;
  let touchEndX = 0;

  const handleTouchStart = (e) => {
    touchStartX = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const deltaX = touchEndX - touchStartX;

    if (deltaX > 50 && activeIndex > 0) {
      // 오른쪽으로 드래그: 이전 컴포넌트로 전환
      setActiveIndex(activeIndex - 1);
    } else if (deltaX < -50 && activeIndex < components.length - 1) {
      // 왼쪽으로 드래그: 다음 컴포넌트로 전환
      setActiveIndex(activeIndex + 1);
    }

    // 초기화
    touchStartX = 0;
    touchEndX = 0;
  };

  return (
    <div
      ref={containerRef}
      style={mainAreaStyle}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div
        style={{ ...slideStyle, transform: `translateX(-${activeIndex * 100}%)` }}
      >
        {components.map((Component, index) => (
          <div key={index} style={{ width: '100%', flexShrink: 0 }}>
            <Component />
          </div>
        ))}
      </div>
    </div>
  );
}

export default MainArea;
