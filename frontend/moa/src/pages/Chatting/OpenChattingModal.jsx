import React, { useState } from 'react';
import MenuHeader from '../../components/ETC/MenuHeader';
import OpenChattingList from '../../components/Chatting/OpenChattingList';
import CreateOpenChatting from '../../components/Chatting/CreateOpenChatting';

const openChatPageStyle = {
  minHeight: '100vh',
  backgroundImage: `
    url(${process.env.PUBLIC_URL}/assets/Background/chatting_background.png)
  `,
  backgroundSize: 'cover', // 배경 이미지 크기 조절
  backgroundRepeat: 'no-repeat', // 배경 이미지 반복 없음
  backgroundPosition: 'center', // 배경 이미지 중앙 정렬
};

const inputStyle = {
  display: 'block',  // 가운데 정렬
  margin: '20px auto',
  padding: '10px 20px',
  width: '80%',
  height: '40px',
  backgroundColor: '#f2f2f2',
  borderRadius: '32px',
  border: 'none',
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
};

const headerStyle = {
  display: 'block',
  margin: '20px',
  padding: '10px',
  textAlign: 'left',
};

const createOpenChatButtonStyle = {
  color: '#515151',
  border: 'none',
  padding: '10px 20px',
  width: '300px',
  height: '50px',
  borderRadius: '32px',
  cursor: 'pointer',

  backgroundColor: '#E7E8FF',
  fontSize: '20px',
  fontFamily: 'Pretendard-Regular',
  boxShadow: '0px 4px 4px rgba(128.33, 106.45, 128.78, 0.10)',

};

const openChatingListContainer = {
  height: '620px',
  overflow: 'scroll',
  marginTop: '20px',
}

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
    <div style={openChatPageStyle}>
      <MenuHeader title="오픈 채팅" />
      <h2 style={headerStyle}>오픈 채팅방 목록</h2>
      {/* <input
        style={inputStyle}
        type="text"
        placeholder="Search" /> */}
      <div>
        <button style={createOpenChatButtonStyle} onClick={openCreateModal}>오픈채팅방 생성</button>
      </div>

      <CreateOpenChatting isOpen={createModalOpen} onClose={closeCreateModal} />
      <div style={openChatingListContainer}>
        <OpenChattingList />
      </div>

    </div>
  );
}

export default OpenChattingModal;
