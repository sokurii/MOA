import React, { useState, useEffect } from 'react';
import { openChatApi } from '../../api/chatApi';

import OpenChattingEntrance from './OpenChattingEntrance';

const openChatItemStyle = {
  margin: '5px',
  padding: '5px',
  border: '1px solid black',
  borderRadius: '5px',
};

function OpenChattingListItem({ openChatId }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [memberCount, setMemberCount] = useState(null);

  useEffect(() => {
    openChatApi.getOpenChatRoomDetail(openChatId)
    .then((response) => {
       const res = response.data.response;
       setTitle(res.openChatTitle);
       setContent(res.openChatContent);
       setMemberCount(res.openChatMemberCount);
    })
  }, [openChatId]);

  const [isEntranceOpen, setIsEntranceOpen] = useState(false);

  const openEntrance = () => {
    setIsEntranceOpen(true);
  }
  const closeEntrance = () => {
    setIsEntranceOpen(false);
  }

  return (
    <div style={openChatItemStyle}>
      <h4>{title}</h4>
      <p>{content}</p>
      <p>참여자 수: {memberCount}</p>

      <button onClick={openEntrance}>입장하기</button>

      {isEntranceOpen &&
        <OpenChattingEntrance 
          closeEntrance={closeEntrance}
          openChatId={openChatId}
          title={title}
          content={content}
          memberCount={memberCount}
        />
      }
    </div>
  );
}

export default OpenChattingListItem;