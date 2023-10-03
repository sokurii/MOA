import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';

import store from '../store';
import { useAppDispatch, useAppSelector } from '../store';
import { setIsForeigner, setIsMatching } from '../store';
import { setUserInfo } from '../store/userInfo';

import { userApi } from '../api/userApi';
import { matchingApi } from '../api/matchingApi';

const loginLoadingStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '100vh',
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

function LoginLoading(props) {
  const isMatching = useAppSelector((state) => state.isMatching);
  
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  
  useEffect(() => {
    userApi.getMemberInfo()
    .then((response) => {
      const res = response.data.response;
      console.log(res);
      dispatch(setUserInfo(res));
      dispatch(setIsForeigner(res.memberIsForeigner));
    })
    .catch((error) => {
      console.log(`유저 정보 조회 오류 : ${error}`);
    })

    matchingApi.isMatching()
    .then((response) => {
      const res = response.data.response;
      console.log('매칭여부:' + res);
      if (res) {
        dispatch(setIsMatching(true));
      } else {
        dispatch(setIsMatching(false));
      };
    })
    .catch((error) => {
      console.log(`매칭여부 조회 오류 : ${error}`);
    })


    setTimeout(() => {
      window.location.reload();
      if (isMatching) {
        navigate('/');
      } else {
        navigate('/matching');
      }
    }, 3000);
    
  }, []);

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

  return (
    <div style={loginLoadingStyle}>
      <div style={imageContainerStyle}>
        <img style={imageStyle} src={currentImageUrl} alt="로고" />
      </div>
      <div style={commentStyle}>
        <span>로그인 중입니다!</span>
      </div>
    </div>
  );
}

export default LoginLoading;