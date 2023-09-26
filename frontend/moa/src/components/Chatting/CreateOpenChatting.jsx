import React, { useState } from 'react';
import { openChatApi } from '../../api/chatApi';

import store from '../../store';

import { useNavigate } from 'react-router-dom';

import CloseButton from '../CloseButton';

const createOpenChatStyle = {
  background: 'linear-gradient(to bottom, #ffffff, silver)',
  padding: '10px 0px',
  position: 'fixed',
  top: 0,
  right: '-100%',
  bottom: 0,
  width: '100%',
  backgroundColor: 'white',
  transition: 'right 0.3s ease-in-out',
  zIndex: 999,
};

const headerStyle = {
  display: 'block',
  margin: '20px',
  padding: '10px',
  textAlign: 'left',
};

const modalOpenStyle = {
  right: 0,
};

const labelStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginRight: '10px',
};

const inputContainerStyle = {
  display: 'flex',  // 가운데 정렬
  margin: '20px',
};

const titleInputStyle = {
  // display: 'block',  // 가운데 정렬
  // margin: '20px auto',
  padding: '10px 20px',
  width: '80%',
  height: '20px',
  backgroundColor: '#f2f2f2',
  borderRadius: '20px',
  border: 'none',
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
};

const contentInputStyle = {
  padding: '10px 20px',
  width: '80%',
  height: '40px',
  backgroundColor: '#f2f2f2',
  borderRadius: '20px',
  border: 'none',
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
};

const createButtonStyle = {
  background: 'linear-gradient(to bottom, lightgreen, green)',
  color: 'white',
  border: 'none',
  padding: '10px 20px',
  borderRadius: '32px',
  cursor: 'pointer',
};

function CreateOpenChatting(props) {
  const modalStyle = props.isOpen ? { ...createOpenChatStyle, ...modalOpenStyle } : createOpenChatStyle;

  const [openChatTitle, setOpenChatTitle] = useState('');
  const [openChatContent, setOpenChatContent] = useState('');
  const [imageFile, setImageFile] = useState(null); // 이미지 파일 상태 변경

  const state = store.getState();
  const accessToken = state.accessToken;

  console.log(accessToken);

  const navigate = useNavigate();

  const handleTitleChange = (e) => {
    setOpenChatTitle(e.target.value);
  };
  const handleContentChange = (e) => {
    setOpenChatContent(e.target.value);
  };
  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]); // 이미지 파일 설정
  };

  const createOpenChatRoom = () => {
    const saveOpenChatRequest = {
      memberId: 1,
      openChatTitle: openChatTitle,
      openChatContent: openChatContent,
    };
  
    const formData = new FormData();
  
    // JSON 데이터를 문자열로 변환하고 Blob 객체로 만듭니다.
    const jsonBlob = new Blob([JSON.stringify(saveOpenChatRequest)], { type: "application/json" });
  
    formData.append('saveOpenChatRequest', jsonBlob);
    formData.append('multipartFile', imageFile); // 이미지 파일 추가
  
    // Content-Type 설정
    const headers = {
      'Content-Type': 'multipart/form-data',
    };
  
    openChatApi.createOpenChatRoom(formData, { headers })
      .then((response) => {
        const openChatId = response.data.response;
        alert('오픈채팅방이 생성되었습니다!');
        navigate(`/chatting/openchat/${openChatId}`, {
          state: {
            openChatId: openChatId,
          }
        });
      })
      .catch((error) => {
        console.log('오픈채팅방 생성 에러 발생');
        console.log(error);
      });
  };

  return (
    <div style={modalStyle}>
      <CloseButton onClose={props.onClose} />
      <h2 style={headerStyle}>오픈채팅방 생성</h2>

      <div style={inputContainerStyle}>
        <label style={labelStyle} htmlFor="file">
          <div>
            이미지 업로드
          </div>
        </label>
        <input
          type="file"
          id="openChatImage"
          accept="image/*"
          onChange={handleImageChange}
        />
      </div>

      <div style={inputContainerStyle}>
        <label style={labelStyle} htmlFor="openChatTitle">제목</label>
        <input
          style={titleInputStyle}
          type="text"
          id="openChatTitle"
          value={openChatTitle}
          onChange={handleTitleChange}
        />
      </div>

      <div style={inputContainerStyle}>
        <label style={labelStyle} htmlFor="openChatContent">설명</label>
        <input
          style={contentInputStyle}
          type="text"
          id="openChatContent"
          value={openChatContent}
          onChange={handleContentChange}
        />
      </div>

      <button style={createButtonStyle} onClick={createOpenChatRoom}>생성하기</button>
    </div>
  );
}

export default CreateOpenChatting;