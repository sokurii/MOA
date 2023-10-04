import React, { useState, useEffect } from 'react';

import store from '../store';

import { useAppDispatch } from '../store';
import { setIsLoading } from '../store/isLoading';

const loadingStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '100vh',
  backgroundColor: 'rgba(0, 0, 0, 0.3)',
  zIndex: '4',
};

const imageContainerStyle = {
  margin: '10px',
};

const imageStyle = {
  margin: '5px',
  width: '70px',
  height: '70px',
};

const commentStyle = {
  fontSize: '24px',
  fontWeight: '700',
}

function Loading(props) {
  const state = store.getState();
  const isLoading = state.isLoading;
  const dispatch = useAppDispatch();
    // 애니메이션 관련
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const imageUrls = [
    process.env.PUBLIC_URL + '/assets/Logo/Logo_M.png',
    process.env.PUBLIC_URL + '/assets/Logo/Logo_O.png',
    process.env.PUBLIC_URL + '/assets/Logo/Logo_A.png',
  ];

  const changeImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % imageUrls.length);
  };

  useEffect(() => {
    const interval = setInterval(changeImage, 500); // 0.5초마다 이미지 변경
  
    return () => clearInterval(interval); // 컴포넌트 언마운트 시 clearInterval
  }, []);

  const currentImageUrl = imageUrls[currentImageIndex];

  useEffect(() => {
  }, [isLoading]);

  return (
    <div style={loadingStyle}>
      <div style={imageContainerStyle}>
        <img style={imageStyle} src={currentImageUrl} alt="로고" />
      </div>
      <div style={commentStyle}>
        <span>접속중!</span>
      </div>
    </div>
  );
}

export default Loading;