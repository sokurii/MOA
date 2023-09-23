import React from 'react';
import BackButton from '../../components/BackButton';
import ChattingArea from '../../components/Chatting/ChattingArea';

// const buddyChatModalStyle = {
//   position: 'fixed',
//   top: 0,
//   right: '-100%', // 처음에는 오른쪽 화면 밖에 위치하도록 설정
//   bottom: 0,
//   width: '100%',
//   backgroundColor: 'white',
//   transition: 'right 0.3s ease-in-out', // 부드러운 슬라이딩 애니메이션을 위한 설정
//   zIndex: 999, // 다른 콘텐츠 위에 나타나도록 zIndex 설정
// };

// const modalOpenStyle = {
//   right: 0, // 오른쪽에서 슬라이드되어 나타나도록 설정
// };

function BuddyChattingModal(props) {
  // const modalStyle = props.isOpen ? { ...buddyChatModalStyle, ...modalOpenStyle } : buddyChatModalStyle;

  return (
    <div>
    {/* <div style={modalStyle}> */}
      <BackButton />
      <p>버디 1:1 채팅</p>
      <ChattingArea />
    </div>
  );
}

export default BuddyChattingModal;
