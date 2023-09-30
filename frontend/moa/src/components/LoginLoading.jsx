import React, { useEffect } from 'react';
import { useNavigate } from 'react-router';

import store from '../store';
import { useAppDispatch } from '../store';
import { setIsForeigner, setIsMatching } from '../store';

import { userApi } from '../api/userApi';
import { matchingApi } from '../api/matchingApi';

const loginLoadingStyle = {
  minHeight: '100vh',
}


function LoginLoading(props) {
  const state = store.getState();
  const isMatching = state.isMatching;
  
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  
  useEffect(() => {
    userApi.getMemberInfo()
    .then((response) => {
      const res = response.data.response;
      console.log(res);
    })
    .catch((error) => {
      console.log(`유저 정보 조회 오류 : ${error}`);
    })

    matchingApi.isMatching()
    .then((response) => {
      const res = response.data.response;
      console.log(res);
    })
    .catch((error) => {
      console.log(`매칭여부 조회 오류 : ${error}`);
    })

    setTimeout(() => {
      if (isMatching) {
        navigate('/');
      } else {
        navigate('/matching');
      }
    }, 3000);
    
  }, []);

  return (
    <div style={loginLoadingStyle}>
      <span>로그인 중입니다</span>
    </div>
  );
}

export default LoginLoading;