import React, { useState } from 'react';
import BackButton from '../../components/BackButton';
import OpenChattingList from '../../components/Chatting/OpenChattingList';
import CreateOpenChatting from '../../components/Chatting/CreateOpenChatting';

const openChatPageStyle = {
  background: 'linear-gradient(to bottom, #ffffff, silver)',
  padding: '10px 0px',
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
  background: 'linear-gradient(to bottom, lightgreen, green)',
  color: 'white',
  border: 'none',
  padding: '10px 20px',
  borderRadius: '32px',
  cursor: 'pointer',
};

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
    {/* <div style={modalStyle}> */}
      <BackButton />
      <h2 style={headerStyle}>오픈 채팅방 목록</h2>
      <input
        style={inputStyle}
        type="text"
        placeholder="Search" />
      <div>
        <button style={createOpenChatButtonStyle} onClick={openCreateModal}>오픈채팅방 생성</button>
      </div>

      <CreateOpenChatting isOpen={createModalOpen} onClose={closeCreateModal} />
      <OpenChattingList />
    </div>
  );
}

export default OpenChattingModal;
