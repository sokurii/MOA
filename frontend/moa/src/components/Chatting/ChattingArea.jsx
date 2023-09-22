import React, { useState, useEffect } from 'react';
import MyTalk from '../MyTalk';
import OpponentTalk from '../OpponentTalk';
import SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';

const chatContainerStyle = {
  margin: '20px',
  border: '1px solid #ccc',
  padding: '20px',
  borderRadius: '5px',
};

function ChattingArea(props) {
  const [inputMyText, setInputMyText] = useState(''); // 나의 텍스트 입력 상태
  const [messages, setMessages] = useState([]); // 대화 메세지 저장용
  const [stompClient, setStompClient] = useState(null); // Stomp 클라이언트 상태

  useEffect(() => {
    // WebSocket 연결 설정
    const socket = new SockJS('http://moamore.site:8589/ws-stomp'); // WebSocket 서버 주소
    const stompClient = Stomp.over(socket);

    stompClient.connect({}, () => {
      setStompClient(stompClient);
      // 연결 성공 시 동작 설정
      stompClient.subscribe('/sub/chat', (message) => {
        const newMessage = JSON.parse(message.body);
        setMessages((prevMessages) => [...prevMessages, newMessage]);
      });
    });

    // 컴포넌트 언마운트 시 WebSocket 연결 해제
    return () => {
      if (stompClient) {
        stompClient.disconnect();
      }
    };
  }, []);

  const handleMyInputKeyDown = (e) => {
    if (e.key === 'Enter' && inputMyText.trim() !== '') {
      const newMessage = { text: inputMyText, isMine: true };
      setMessages((prevMessages) => [...prevMessages, newMessage]);
      setInputMyText('');

      if (stompClient && stompClient.connected) {
        stompClient.send('/pub/chat', {}, JSON.stringify(newMessage));
      }
    }
  };

  return (
    <div style={chatContainerStyle}>
      <div>
        <h4>대화상대 이름</h4>
      </div>
      <hr />
      <div>
        {messages.map((message, index) =>
          message.isMine ? (
            <MyTalk key={index} talk={message.text} />
          ) : (
            <OpponentTalk key={index} talk={message.text} />
          )
        )}
      </div>
      <div>
        <input
          type="text"
          value={inputMyText}
          onChange={(e) => setInputMyText(e.target.value)}
          onKeyDown={handleMyInputKeyDown}
          placeholder="채팅"
        />
      </div>
    </div>
  );
}

export default ChattingArea;