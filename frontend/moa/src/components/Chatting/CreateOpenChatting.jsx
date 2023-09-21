import React, { useState } from 'react';
import { openChatApi } from '../../api/chatApi';

import { useNavigate } from 'react-router-dom';

import CloseButton from '../CloseButton';

const createOpenChatStyle = {
  position: 'fixed',
  top: 0,
  right: '-100%',
  bottom: 0,
  width: '100%',
  backgroundColor: 'white',
  transition: 'right 0.3s ease-in-out',
  zIndex: 999,
};

const modalOpenStyle = {
  right: 0,
};

function CreateOpenChatting(props) {
  const modalStyle = props.isOpen ? { ...createOpenChatStyle, ...modalOpenStyle } : createOpenChatStyle;

  const [openChatTitle, setOpenChatTitle] = useState('');
  const [openChatContent, setOpenChatContent] = useState('');
  const [imageFile, setImageFile] = useState(null); // 이미지 파일 상태 변경

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
      <h3>오픈채팅방 생성</h3>

      <div>
        <label htmlFor="openChatImage">이미지 업로드</label>
        <input
          type="file"
          id="openChatImage"
          accept="image/*"
          onChange={handleImageChange}
        />
      </div>

      <div>
        <label htmlFor="openChatTitle">제목</label>
        <input
          type="text"
          id="openChatTitle"
          value={openChatTitle}
          onChange={handleTitleChange}
        />
      </div>
      <div>
        <label htmlFor="openChatContent">설명</label>
        <input
          type="text"
          id="openChatContent"
          value={openChatContent}
          onChange={handleContentChange}
        />
      </div>

      <button onClick={createOpenChatRoom}>생성하기</button>
    </div>
  );
}

export default CreateOpenChatting;