import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import AppBar from '../../components/ETC/AppBar';
import BuddyChattingModal from './BuddyChattingModal';
import OpenChattingModal from './OpenChattingModal';

const chatHomeStyle = {
  height: '100vh',

};

const linkStyle = {
  textDecoration: 'none', // 밑줄 제거
  color: 'inherit', // 링크 색상을 상위 요소에서 상속
};

const introduceStyle = {
  textAlign: 'left',
  fontSize: '24px',
  fontWeight: '700',
};

const buddyChatButtonStyle = {
  background: 'linear-gradient(180deg, #E9F6FF 17%, #8EB0E3 77%)',
  borderRadius: '18px',
  margin: '40px auto',
  padding: '40px',
  boxShadow: '0px 10px 6px rgba(0, 0, 0, 0.1)',
};

const buttonContainerStyle = {

};

const buttonTitleStyle = {
  display: 'flex',
  color: '#284657',
  fontSize: '24px',
  fontWeight: '700',
};

const buttonContentStyle = {
  display: 'flex',
  textAlign: 'left',
  color: '#284657',
  fontSize: '18px',
  fontWeight: '700',
};

function ChattingHome(props) {
  const [isBuddyChattingModalOpen, setIsBuddyChattingModalOpen] = useState(false);
  const [isOpenChattingModalOpen, setIsOpenChattingModalOpen] = useState(false);

  const openBuddyChattingModal = () => {
    setIsBuddyChattingModalOpen(true);
  };

  const openOpenChattingModal = () => {
    setIsOpenChattingModalOpen(true);
  };


  const closeBuddyChattingModal = () => {
    setIsBuddyChattingModalOpen(false);
  };
  const closeOpenChattingModal = () => {
    setIsOpenChattingModalOpen(false);
  };


  return (
    <div style={chatHomeStyle}>
      <AppBar />
      <div style={introduceStyle}>
        <div>채팅하기</div>
        <span>
          버디 혹은 다양한 사람들과 채팅을 해보세요!
          <br />
          어느새 한국어 실력이 늘어있을 거예요
        </span>
      </div>
      <div style={buttonContainerStyle}>
        <Link to="/chatting/buddy" style={linkStyle}>
          <div style={buddyChatButtonStyle}>
            <p style={buttonTitleStyle}>버디와 1:1 대화하기</p>
            <p style={buttonContentStyle}>
              나와 매칭된 버디와 친해지기
            </p>
          </div>
        </Link>
        <Link to="/chatting/openchat" style={linkStyle}>
          <div style={buddyChatButtonStyle}>
            <p style={buttonTitleStyle}>오픈 채팅방 참여하기</p>
            <p style={buttonContentStyle}>
              관심사에 따른 단체 채팅방
            </p>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default ChattingHome;