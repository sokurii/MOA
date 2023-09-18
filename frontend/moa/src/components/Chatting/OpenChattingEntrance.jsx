import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import CloseButton from '../CloseButton';

function OpenChattingEntrance(props) {
  const navigate = useNavigate();

  const handleOpenChattingClick = () => {
    navigate(`/chatting/openchat/${props.id}`, {
      state: {
        id: props.id,
        title: props.title,
        description: props.description,
        participate: props.participate,
      },
    });
  };

  return (
    <div>
      <CloseButton onClose={props.closeEntrance} />
      <p>오픈채팅 입장 페이지</p>
      <div>
        <p>사진 Component</p>
      </div>
      <hr />
      <div>
        <h3>{props.title}</h3>
        <p>{props.participate.length}</p>
      </div>
      <div>{props.description}</div>

      <button onClick={handleOpenChattingClick}>입장하기</button>
    </div>
  );
}

export default OpenChattingEntrance;
