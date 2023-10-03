import React, { useState, useEffect } from 'react';

import store from '../store';

import CloseButton from './CloseButton';


const profileStyle = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  background: 'white',
  zIndex: '3',
  width: '100%',
  borderBottomLeftRadius: '18px',
  borderBottomRightRadius: '18px',
  boxShadow: '0px 10px 6px rgba(0, 0, 0, 0.1)',
};


const userInfoStyle = {
  display: 'flex',
};

const imageContainerStyle = {

};

const imageStyle = {
  width: '70px',
  height: '70px',
};

const userInfoRightStyle = {
  display: 'flex',
  flexDirection: 'column',
};

const expLevelContainerStyle = {
  display: 'flex',
  flexDirection: 'column',
};

const labelStyle = {
  display: 'flex',
  justifyContent: 'space-between',
};

const expLevelStyle = {
  display: 'flex',
  justifyContent: 'space-between',
};

const levelStyle = {
  display: 'flex',

};

const expStyle = {
  display: 'flex',
};

function Profile({ onClose }) {
  const state = store.getState();
  const userInfo = state.userInfo;
  const profileImgUrl = JSON.parse(userInfo).memberImgAddress;
  const memberName = JSON.parse(userInfo).memberName;
  const nation = JSON.parse(userInfo).memberNationName;

  const [isTaekeukOpen, setIsTaekeukOpen] = useState(false);
  const [isLevelTableOpen, setIsLevelTableOpen] = useState(false);

  const toggleTaekeuk = () => {
    setIsTaekeukOpen(!isTaekeukOpen);
  };

  const openLevelTable = () => {
    setIsLevelTableOpen(true);
  };

  const closeLevelTable = () => {
    setIsLevelTableOpen(false);
  };


  return (
    <div style={profileStyle}>
      <CloseButton onClose={onClose}/>
      <div style={userInfoStyle}>
        <div style={imageContainerStyle}>
          <img style={imageStyle}src={profileImgUrl} alt="프로필 사진" />
        </div>
        <div style={userInfoRightStyle}>
          <span>{ memberName }</span>
          <span>{ nation }</span>
          <span>유저 정보</span>
        </div>
      </div>
      <div style={expLevelContainerStyle}>
        <div style={labelStyle}>
          <span>경험치 및 레벨</span>
          <div onClick={openLevelTable}>
            레벨 표
          </div>
        </div>
        <div style={expLevelStyle}>
          <div style={levelStyle} onClick={toggleTaekeuk}>
            <p>레벨</p>
          </div>
          <div style={expStyle}>
            <p>경험치 바</p>
          </div>
        </div>
        {isTaekeukOpen && <div>태극기</div>}
        {isLevelTableOpen && 
          <div>
            <CloseButton onClose={closeLevelTable}/>
            레벨 표
          </div>
        }
      </div>
    </div>
  );
}

export default Profile;