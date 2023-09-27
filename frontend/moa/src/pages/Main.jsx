import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

import AppBar from '../components/AppBar';
import BackButton from '../components/BackButton';

function Main(props) {
  const isLoggedIn = props.inLoggedIn;
  const navigate = useNavigate();

  // useEffect(() => {
  //   if (!isLoggedIn) {
  //     // 로그인되어 있지 않으면 Intro 페이지로 리디렉션합니다.
  //     navigate('/intro');
  //   }
  // }, []);

  return (
    <div>
      <AppBar />
      <div>
        <Link to="/chatting">
          <button>채팅</button>
        </Link>
      </div>
      <div>
        <Link to="/koreanlearning/default">
          <button>뉴스 보기</button>
        </Link>
        <Link to="/quiz">
          <button>퀴즈 풀기</button>
        </Link>
        <Link to="/qna-board">
          <button>질문하기</button>
        </Link>

        <Link to="/buddy">
          <button>버디랑 놀기</button>
        </Link>

        {/* 첫 화면 이동을 위해 임시로 만든 버튼 */}
        <div>
          <Link to="/intro">
            <button>첫 화면으로 이동</button>
          </Link>
        </div>
        {/* <BackButton /> */}
      </div>
    </div>
  );
}

export default Main;