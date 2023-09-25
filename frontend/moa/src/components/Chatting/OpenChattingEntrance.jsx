import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import CloseButton from '../CloseButton';

function OpenChattingEntrance(props) {
  const { closeEntrance, openChatId, title, content, memberCount } = props


  const navigate = useNavigate();

  const handleOpenChattingClick = () => {
    navigate(`/chatting/openchat/${openChatId}`, {
      state: {
        openChatId,
      },
    });
  };

  return (
    <div>
      <CloseButton onClose={closeEntrance} />
      <p>오픈채팅 입장 페이지</p>
      <div>
        <p>사진 Component</p>
      </div>
      <hr />
      <div>
        <h3>{title}</h3>
        <p>{memberCount}</p>
      </div>
      <div>{content}</div>

      <button onClick={handleOpenChattingClick}>입장하기</button>
    </div>
  );
}

export default OpenChattingEntrance;
