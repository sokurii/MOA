import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CloseButton from '../CloseButton';
import Loading from '../Loading';

const openChatEntranceStyle = {
  padding: '10px 0px',
  position: 'fixed',
  top: 0,
  right: '-100%', // 초기 상태
  bottom: 0,
  width: '100%',
  backgroundColor: 'white',
  transition: 'right 0.3s ease-in-out', // right 속성에 애니메이션 적용
  zIndex: 999,
};

const modalOpenStyle = {
  right: 0,
};

const imageContainerStyle = {
  position: 'relative', // 이미지 컨테이너에 상대 위치 설정
};

const imageStyle = {
  width: '100%',
};

const overlayStyle = {
  position: 'absolute', // 레이어를 절대 위치로 설정
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  backgroundColor: 'rgba(0, 0, 0, 0.5)', // 반투명 레이어 색상 설정
  zIndex: 1, // 이미지 위에 나타나도록 설정
};

const openChatInfoStyle = {
  padding: '32px',
};

const titleContainerStyle = {
  display: 'flex',
};

const titleStyle = {
  marginRight: '10px',
  fontSize: '24px',
  fontWeight: '700',
};

const memberCountStyle = {
  paddingTop: '8px',
  color: '#C4C4C4',
  fontSize: '20px',
  fontWeight: '700',
};

const contentStyle = {
  fontSize: '20px',
  fontWeight: '400',
};

const entranceButtonStyle = {
  width: '50%',
  height: '40px',
  background: 'linear-gradient(to bottom, lightgreen, green)',
  color: 'white',
  border: 'none',
  borderRadius: '32px',
};

const entranceButtonContainerStyle = {
  margin: '20px auto',
};

function OpenChattingEntrance(props) {
  const { closeEntrance, openChatId, title, content, memberCount, imgUrl, isOpen } = props;

  const modalStyle = isOpen ? { ...openChatEntranceStyle, ...modalOpenStyle } : openChatEntranceStyle;

  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleOpenChattingClick = () => {
    setIsLoading(true);

    setTimeout(() => {
      navigate(`/chatting/openchat/${openChatId}`, {
        state: {
          openChatId,
        },
      });
    }, 2000);
  };

  return (
    <div style={modalStyle}>
      {isLoading ? (
          <Loading />
        ) : (
          <>
            <CloseButton onClose={closeEntrance} />
            <div style={imageContainerStyle}>
              <img style={imageStyle} src={`https://storage.googleapis.com/diary_storage/open_chat/${imgUrl}`} alt="오픈채팅 사진" />
              <div style={overlayStyle}></div>
            </div>
            <div style={openChatInfoStyle}>
              <div style={titleContainerStyle}>
                <p style={titleStyle}>{title}</p>
                <p style={memberCountStyle}>{memberCount}</p>
              </div>
              <div style={contentStyle}>{content}</div>
              <div style={entranceButtonContainerStyle}>
                <button style={entranceButtonStyle} onClick={handleOpenChattingClick}>
                  입장하기
                </button>
              </div>
            </div>
          </>
        )}
    </div>
  );
}

export default OpenChattingEntrance;
