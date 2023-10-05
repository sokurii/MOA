import React, { useState, useEffect, useRef } from 'react';
import { openChatApi } from '../../api/chatApi';

import store from '../../store';
import BuddyMyTalk from '../BuddyMyTalk';
import BuddyOpponentTalk from '../BuddyOpponentTalk';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';

const chatContainerStyle = {
  margin: '20px',
  border: '1px solid #ccc',
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
  width: '90%',
  backgroundColor: '#f2f2f2',
  borderRadius: '32px',
  border: 'none',
};

function BuddyChatArea({ buddyId }) {
  const [inputMyText, setInputMyText] = useState(''); // 나의 텍스트 입력 상태
  const [messages, setMessages] = useState([]); // 대화 메세지 저장용
  const [stompClient, setStompClient] = useState(null);

  const state = store.getState();
  const userInfo = state.userInfo;
  const sender = JSON.parse(userInfo).memberId;

  const chatAreaRef = useRef(null);

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
      setInputMyText('');
    }
  };

  return (
    <div style={chatContainerStyle}>
      <div style={chatAreaStyle}>
        {messages.map((message, index) =>
          message.sender === sender ? (
            <BuddyMyTalk key={index} talk={message.message} />
          ) : (
            <BuddyOpponentTalk key={index} talk={message.message} />
          )
        )}
      </div>
      <hr />
      <form onSubmit={handleFormSubmit}>
        <input
          style={inputStyle}
          type="text"
          value={inputMyText}
          onChange={(e) => setInputMyText(e.target.value)}
          placeholder="메세지를 입력하세요"
        />
      </form>
    </div>
  );
}

export default BuddyChatArea;