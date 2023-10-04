import React from 'react';
import { useLocation } from 'react-router-dom';
import MenuHeader from '../../components/ETC/MenuHeader';
import BuddyChatArea from '../../components/Chatting/BuddyChatArea';

const buddyChatStyle = {
  height: '100vh',
  backgroundImage: `
    url(${process.env.PUBLIC_URL}/assets/Background/chatting_background.png)
  `,
  backgroundSize: 'cover', // 배경 이미지 크기 조절
  backgroundRepeat: 'no-repeat', // 배경 이미지 반복 없음
  backgroundPosition: 'center', // 배경 이미지 중앙 정렬
};

function BuddyChattingModal(props) {
  const location = useLocation();
  const state = location.state;
  const buddyId = state.buddyId;
  
  return (
    <div style={buddyChatStyle}>
      <MenuHeader title="버디 채팅"/>
      <BuddyChatArea buddyId={buddyId}/>
    </div>
  );
}

export default BuddyChattingModal;
