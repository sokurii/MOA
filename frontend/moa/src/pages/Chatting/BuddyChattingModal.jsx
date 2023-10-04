import React from 'react';
import MenuHeader from '../../components/ETC/MenuHeader';
import ChattingArea from '../../components/Chatting/ChattingArea';

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

  return (
    <div style={buddyChatStyle}>
      <MenuHeader title="버디 채팅"/>
      <ChattingArea />
    </div>
  );
}

export default BuddyChattingModal;
