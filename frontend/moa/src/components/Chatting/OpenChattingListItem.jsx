import React, { useState, useEffect } from 'react';
import { openChatApi } from '../../api/chatApi';

import OpenChattingEntrance from './OpenChattingEntrance';

const openChatItemStyle = {
  display: 'flex',
  margin: '20px auto',
  width: '80%',
  padding: '15px',
  borderRadius: '16px',
  backgroundColor: 'white',
};

const imageContainerStyle = {
  display: 'flex', // 이미지를 가운데 정렬하기 위해 추가
  alignItems: 'center', // 이미지를 수직 가운데 정렬하기 위해 추가
  marginRight: '10px', // 이미지와 텍스트 사이 여백 조절
};

const imageStyle = {
  border: '1px solid #C8C8C8',
  backgroundColor: '#C4C4C4',
  borderRadius: '9999px',
  width: '60px',
  height: '60px',
};

const titleStyle = {
  fontFamily: 'Pretendard-Regular',
  marginRight: '5px',
  justifyContent: 'center',
  fontSize: '22px',
  fontWeight: '700',
  lineHeight: '18.90px',
  textAlign: 'left'
};

const memberCountStyle = {
  paddingTop: '2px',
  color: '#9D9D9D',
  fontSize: '20px',
  fontWeight: '700',
  backgroundColor: 'white',
  fontFamily: 'Pretendard-Regular',
};

const contentStyle = {
  fontSize: '14px',
  fontWeight: '400',
  textAlign: 'left',
};

const entranceButtonStyle = {
  color: '#515151',
  height: '50px',
  padding: '15px',

  backgroundColor: '#E7E8FF',
  fontSize: '17px',
  fontFamily: 'Pretendard-Regular',
  border: 'none',
  borderRadius: '10px',
};

const entranceButtonContainerStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

function OpenChattingListItem({ openChatId }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [memberCount, setMemberCount] = useState(null);
  const [imgUrl, setImgUrl] = useState(null);

  useEffect(() => {
    openChatApi.getOpenChatRoomDetail(openChatId)
      .then((response) => {
        const res = response.data.response;
        setTitle(res.openChatTitle);
        // if(res)
        setContent(res.openChatContent);
        console.log(res.openChatContent.length);
        setMemberCount(res.openChatMemberCount);
        setImgUrl(res.openChatImgUrl);
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
    <div className='openchat-list-item' style={openChatItemStyle}>
      <div style={imageContainerStyle}>
        <img style={imageStyle} src={`https://storage.googleapis.com/diary_storage/open_chat/${imgUrl}`} alt="오픈채팅 사진" />
      </div>
      <div className='right-block' style={{ flex: '1' }}>
        <div className='right-upper-block' style={{ display: 'flex', }}>
          <p style={titleStyle}>{title}</p>
          <p style={memberCountStyle}>{memberCount}</p>
        </div>
        <div className='right-lower-block' style={{ marginTop: '-30px', width: '190px' }}>
          <p style={contentStyle}>{content}</p>
        </div>
      </div>
      <div style={entranceButtonContainerStyle}>
        <button style={entranceButtonStyle} onClick={openEntrance}>입장</button>
      </div>

      <OpenChattingEntrance
        isOpen={isEntranceOpen}
        closeEntrance={closeEntrance}
        openChatId={openChatId}
        title={title}
        content={content}
        memberCount={memberCount}
        imgUrl={imgUrl}
      />
    </div>
  );
}

export default OpenChattingListItem;