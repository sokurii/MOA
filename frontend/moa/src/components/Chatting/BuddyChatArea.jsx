import React, { useState, useEffect, useRef } from 'react';
import { openChatApi } from '../../api/chatApi';

import store from '../../store';
import BuddyMyTalk from '../BuddyMyTalk';
import BuddyOpponentTalk from '../BuddyOpponentTalk';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';

const chatContainerStyle = {
  padding: '20px',
  borderRadius: '5px',
};

const chatAreaStyle = {
  height: '70vh',
  overflowY: 'auto',
};

const inputStyle = {
  margin: '10px',
  padding: '10px',
  width: '80%',
  backgroundColor: '#f2f2f2',
  borderRadius: '32px',
  border: 'none',
};

const inputFormStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  background: '#F2F2F2',
  borderRadius: '30px',
};

const buttonStyle = {
  marginRight: '10px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  border: 'none',
  padding: '5px',
  background: 'transparent',
};

const iconStyle = {
  width: '100%',
  height: '100%',
};

function BuddyChatArea({ buddyId }) {
  const [inputMyText, setInputMyText] = useState(''); // 나의 텍스트 입력 상태
  const [messages, setMessages] = useState([]); // 대화 메세지 저장용
  const [stompClient, setStompClient] = useState(null);

  const state = store.getState();
  const userInfo = state.userInfo;
  const sender = JSON.parse(userInfo).memberId.toString();

  const chatAreaRef = useRef();

  useEffect(() => {
    openChatApi.buddyChatLog(buddyId)
    .then((response) => {
      const res = response.data.response;
      setMessages(res.reverse());
    })
    .catch((error) => {
      console.log('버디 채팅기록 소환 에러 발생');
      console.log(error);
    })
  }, [messages]);

  useEffect(() => {
    const scrollToBottom = () => {
      if (chatAreaRef.current) {
        chatAreaRef.current.scrollTop = chatAreaRef.current.scrollHeight;
      }
    };
    scrollToBottom();
  }, [messages])

  useEffect(() => {
    setStompClient(
      Stomp.over(new SockJS('https://moamore.site:8589/ws-stomp'))
    );
  }, []);

  useEffect(() => {
    if (stompClient) {
      stompClient.connect({}, () => {
        stompClient.subscribe(`/sub/chat/message`, (message) => {
          try {
            const newMessage = JSON.parse(message.body);
            console.log(newMessage);
            setMessages((prevMessages) => [...prevMessages, newMessage]);
          } catch (error) {
            console.log('subscribe 콜백 함수에서 에러 발생:', error);
          }
        }, {});

        console.log(stompClient.subscriptions);

        stompClient.send(`/pub/chat/message`, {},
        JSON.stringify({
          messageType: 'BUDDY_ENTER',
          roomType: 2,
          roomId: buddyId,
          sender: sender,
          message: null,
        })
      );
      });
    }

    // 컴포넌트 언마운트 시 WebSocket 연결 해제
    return () => {
      if (stompClient) {
        stompClient.disconnect();
      }
    };
  }, [buddyId, stompClient]);

  const handleFormSubmit = (e) => {
    e.preventDefault(); // 폼 제출 기능 비활성화

    if (inputMyText.trim() !== '') {
      // 엔터 키를 누르면 나의 메시지를 배열에 추가합니다.
      if (stompClient && stompClient.connected) {
        stompClient.send(`/pub/chat/message`, {}, JSON.stringify({
          messageType: 'BUDDY_TALK',
          roomType: 2,
          roomId: buddyId,
          sender: sender,
          message: inputMyText,
        }));
      };
      chatAreaRef.current.scrollTop = chatAreaRef.current.scrollHeight;
      setInputMyText('');
    }
  };

  return (
    <div style={chatContainerStyle}>
      <div 
        style={chatAreaStyle}
        ref={chatAreaRef}
      >
        {messages.map((message, index) =>
          message.sender === sender ? (
            <BuddyMyTalk key={index} talk={message.message} />
          ) : (
            <BuddyOpponentTalk key={index} talk={message.message} />
          )
        )}
      </div>
      <hr />
      <form onSubmit={handleFormSubmit} style={inputFormStyle}> 
        <input
          style={inputStyle}
          type="text"
          value={inputMyText}
          onChange={(e) => setInputMyText(e.target.value)}
          placeholder="메세지를 입력하세요"
        />
        <button style={buttonStyle} type="submit">
          <img style={iconStyle} src={process.env.PUBLIC_URL + '/assets/Chatting/submitIcon.png'} alt="전송" />
        </button>
      </form>
    </div>
  );
}

export default BuddyChatArea;