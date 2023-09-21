import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { openChatApi } from '../../api/chatApi';

import BackButton from '../../components/BackButton';
import ChattingArea from '../../components/Chatting/ChattingArea';

function OpenChattingDetail(props) {
  const location = useLocation();
  const state = location.state;
  const openChatId = state.openChatId;

  const [title, setTitle] = useState('');
  const [memberCount, setMemberCount] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    openChatApi.getOpenChatRoomDetail(openChatId)
    .then((response) => {
       const res = response.data.response;
       setTitle(res.openChatTitle);
       setMemberCount(res.openChatMemberCount);
    })
  }, [openChatId]);

  const deleteOpenChat = () => {
    openChatApi.deleteOpenChatRoom(openChatId)
    .then((response) => {
      alert('오픈채팅방이 삭제되었습니다');
      navigate('/chatting');
    })
  };

  return (
    <div>
      <BackButton />
      <div>
        <button onClick={deleteOpenChat}>오픈채팅방 삭제</button>
        <h3>{ title }</h3>
        <p>{ memberCount }</p>
      </div>
      <ChattingArea />
    </div>
  );
}

export default OpenChattingDetail;