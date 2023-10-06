import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { matchingApi } from '../../api/matchingApi';

import AppBar from '../../components/ETC/AppBar';
import Loading from '../../components/Loading';
import BottomBar from '../../components/ETC/BottomBar';

const chatHomeStyle = {
  height: '100vh',
  backgroundImage: `
    url(${process.env.PUBLIC_URL}/assets/Background/chatting_background.png)
  `,
  backgroundSize: 'cover', // 배경 이미지 크기 조절
  backgroundRepeat: 'no-repeat', // 배경 이미지 반복 없음
  backgroundPosition: 'center', // 배경 이미지 중앙 정렬
};

const linkStyle = {
  textDecoration: 'none', // 밑줄 제거
  color: 'inherit', // 링크 색상을 상위 요소에서 상속
};

const introduceStyle = {
  textAlign: 'left',
  fontSize: '24px',
  fontWeight: '700',
  margin: '30px 40px',
};

const titleStyle = {
  fontSize: '20px',
  fontWeight: '700',
};

const commentStyle = {
  fontSize: '14px',
  fontWeight: '400',
  margin: '10px 0',
};

const buddyChatButtonStyle = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  backgroundImage: `
    url(${process.env.PUBLIC_URL}/assets/Chatting/buddyChat.png)
  `,
  backgroundSize: 'cover', // 배경 이미지 크기 조절
  backgroundRepeat: 'no-repeat', // 배경 이미지 반복 없음
  backgroundPosition: 'center', // 배경 이미지 중앙 정렬
  borderRadius: '18px',
  margin: '40px auto',
  padding: '40px',
  boxShadow: '0px 10px 6px rgba(0, 0, 0, 0.1)',
  height: '100px',
};

const openChatButtonStyle = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  backgroundImage: `
    url(${process.env.PUBLIC_URL}/assets/Chatting/openChat.png)
  `,
  backgroundSize: 'cover', // 배경 이미지 크기 조절
  backgroundRepeat: 'no-repeat', // 배경 이미지 반복 없음
  backgroundPosition: 'center', // 배경 이미지 중앙 정렬
  borderRadius: '18px',
  margin: '40px 0',
  padding: '40px',
  boxShadow: '0px 10px 6px rgba(0, 0, 0, 0.1)',
  height: '100px',
};

const buttonContainerStyle = {
  margin: '30px',
};

const buttonTitleStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  color: '#284657',
  fontSize: '26px',
  fontFamily: 'Ganpan',
  fontWeight: '700',
};

const buttonContentStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  color: '#284657',
  fontSize: '14px',
  fontWeight: '400',
};

function ChattingHome(props) {
  const [buddyId, setBuddyId] = useState(null);

  const [isLoading, setIsLoading] = useState(false);

  useEffect (() => {
    matchingApi.isMatching()
    .then((response) => {
      const res = response.data.response;
      console.log(res); 
      setBuddyId(res);
    })
    .catch((error) => {
      alert('매칭된 버디가 없습니다');
    });
  }, [])

  const navigate = useNavigate();

  const handleBuddyChatClick = () => {
    setIsLoading(true);

    setTimeout(() => {
      navigate('/chatting/buddy', {
        state: {
          buddyId,
        },
      });
    }, 2000);
  };

  return (
    <div style={chatHomeStyle}>
      {isLoading ? (
          <Loading />
        ) : (
        <>
          <AppBar />
          <div style={introduceStyle}>
            <div style={titleStyle}>채팅하기</div>
            <div style={commentStyle}>
              <span>
                버디 혹은 다양한 사람들과 채팅을 해보세요!
                <br />
                어느새 한국어 실력이 늘어있을 거예요!
              </span>
            </div>
          </div>
          <div style={buttonContainerStyle}>
            <div style={buddyChatButtonStyle} onClick={handleBuddyChatClick}>
              <span style={buttonTitleStyle}>버디와 1:1 대화하기</span>
              <span style={buttonContentStyle}>
                나와 매칭된 버디와 친해지기
              </span>
            </div>
            <Link to="/chatting/openchat" style={linkStyle}>
              <div style={openChatButtonStyle}>
                <span style={buttonTitleStyle}>오픈 채팅방 참여하기</span>
                <span style={buttonContentStyle}>
                  관심사에 따른 단체 채팅방
                </span>
              </div>
            </Link>
          </div>
          <BottomBar />
        </>
      )}
    </div>
  );
}

export default ChattingHome;