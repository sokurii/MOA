import React, { useState } from 'react';
import BackButton from '../../components/BackButton';
import OpenChattingList from '../../components/Chatting/OpenChattingList';
import CreateOpenChatting from '../../components/Chatting/CreateOpenChatting';

// const openChatModalStyle = {
//   position: 'fixed',
//   top: 0,
//   right: '-100%', // 처음에는 오른쪽 화면 밖에 위치하도록 설정
//   bottom: 0,
//   width: '100%',
//   overflow: 'auto',
//   backgroundColor: 'white',
//   transition: 'right 0.3s ease-in-out', // 부드러운 슬라이딩 애니메이션을 위한 설정
//   zIndex: 999, // 다른 콘텐츠 위에 나타나도록 zIndex 설정
// };

// const modalOpenStyle = {
//   right: 0, // 오른쪽에서 슬라이드되어 나타나도록 설정
// };

function OpenChattingModal(props) {
  // const modalStyle = props.isOpen ? { ...openChatModalStyle, ...modalOpenStyle } : openChatModalStyle;

  const [createModalOpen, setCreateModalOpen] = useState(false);

  const openCreateModal = () => {
    setCreateModalOpen(true);
  };

  const closeCreateModal = () => {
    setCreateModalOpen(false);
  };

  return (
    <div>
    {/* <div style={modalStyle}> */}
      <BackButton />
      <h3>오픈 채팅 목록</h3>
      <div>
        <p>검색 input Component</p>
      </div>
      <div>
        <button onClick={openCreateModal}>오픈채팅방 생성</button>
      </div>

      <CreateOpenChatting isOpen={createModalOpen} onClose={closeCreateModal} />
      <OpenChattingList />
    </div>
  );
}

export default OpenChattingModal;
