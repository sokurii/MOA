import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

import AppBar from '../components/AppBar';
import MainArea from '../components/MainArea';
import BottomBar from '../components/BottomBar';
import BackButton from '../components/BackButton';

const mainPageStyle = {
  display: 'flex',
  flexDirection: 'column',
  minHeight: '100vh',
};

const mainAreaContainerStyle = {
  marginBottom: '64px',
}

const bottomBarContainerStyle = {
  position: 'fixed',
  bottom: '0',
  left: '0',
  right: '0',
  width: '100%',
  boxSizing: 'border-box',
};

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
    <div style={mainPageStyle}>
      <AppBar />
      {/* 첫 화면 이동을 위해 임시로 만든 버튼 */}
      <div>
        <Link to="/intro">
          <button>첫 화면으로 이동</button>
        </Link>
      </div>
      <div style={mainAreaContainerStyle}>
        <MainArea />
      </div>
      {/* bottombar */}
      <div style={bottomBarContainerStyle}>
        <BottomBar />
      </div>
    </div>
  );
}

export default Main;