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
  // 대화 메세지 저장용 리스트를 만들어서 이전 대화내역이 출력되는 등의 조치가 필요할 듯
  // { type, sender, message } 형태로 저장해야할 듯?
  const [inputMyText, setInputMyText] = useState(''); // 나의 텍스트 입력 상태
  const [messages, setMessages] = useState([]); // 대화 메세지 저장용
  const [stompClient, setStompClient] = useState(null); // Stomp 클라이언트 상태

  const [roomId, setRoomId] = useState('1');
  const [name, setName] = useState('한국인');

  useEffect(() => {
    // WebSocket 연결 설정
    const socket = new SockJS('https://moamore.site:8589/ws-stomp'); // WebSocket 서버 주소
    const stompClient = Stomp.over(socket);


    stompClient.connect({}, () => {
      setStompClient(stompClient);
      console.log(stompClient.connected);
      // 연결 성공 시 동작 설정
      stompClient.subscribe(`/sub/chat/buddy/${roomId}`, (message) => {
        const newMessage = JSON.parse(message.body);
        setMessages((prevMessages) => [...prevMessages, newMessage]);
      });
      stompClient.send(`/pub/chat/buddy/${roomId}`, {},
        JSON.stringify({
          messageType: 'BUDDY_ENTER',
          roomType: 2,
          roomId: roomId,
          sender: name,
          message: '님이 입장했습니다',
        })
      );

    });

    // 컴포넌트 언마운트 시 WebSocket 연결 해제
    return () => {
      if (stompClient) {
        stompClient.disconnect();
      }
    };
  }, [messages]);

  const handleMyInputKeyDown = (e) => {
    if (e.key === 'Enter' && inputMyText.trim() !== '') {
      const newMessage = { text: inputMyText, isMine: true };
      setMessages((prevMessages) => [...prevMessages, newMessage]);
      setInputMyText('');

      if (stompClient && stompClient.connected) {
        stompClient.send(`/pub/chat/buddy/${roomId}`, {}, JSON.stringify({
          messageType: 'BUDDY_TALK',
          roomType: 2,
          roomId: roomId,
          sender: name,
          message: newMessage,
        }));
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