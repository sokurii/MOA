import React, { useState, useEffect, useRef } from 'react';
import { openChatApi } from '../../api/chatApi';
import MyTalk from '../MyTalk';
import OpponentTalk from '../OpponentTalk';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';

const chatContainerStyle = {
  margin: '20px',
  border: '1px solid #ccc',
  padding: '20px',
  borderRadius: '5px',
};

const inputStyle = {
  margin: '10px',
  padding: '10px',
  width: '90%',
  backgroundColor: '#f2f2f2',
  borderRadius: '32px',
  border: 'none',
};

function ChattingArea({ openChatId }) {
  // 대화 메세지 저장용 리스트를 만들어서 이전 대화내역이 출력되는 등의 조치가 필요할 듯
  // { type, sender, message } 형태로 저장해야할 듯?
  const [inputMyText, setInputMyText] = useState(''); // 나의 텍스트 입력 상태
  const [messages, setMessages] = useState([]); // 대화 메세지 저장용
  const [stompClient, setStompClient] = useState(null);

  // 이름 등의 사용자 정보는 store에 저장해서 꺼내 쓰는 식으로 해야할 듯
  const [sender, setSender] = useState('test');

  // useEffect(() => {
  //   // 비동기 함수를 정의
  //   const fetchChatLog = async () => {
  //     try {
  //       const response = await openChatApi.openChatLog(openChatId);
  //       const res = response.data.response;
  //       console.log(res);
  //       setMessages(res);
  //     } catch (error) {
  //       console.log('오픈채팅 대화내역 조회 오류');
  //       console.log(error);
  //     }
  //   };
  
  //   // fetchChatLog 함수를 호출
  //   fetchChatLog();
  // }, []);

  useEffect(() => {
    setStompClient(
      Stomp.over(new SockJS('https://moamore.site:8589/ws-stomp'))
    );
  }, []);

  useEffect(() => {
    if (stompClient) {
      stompClient.connect({}, () => {
        stompClient.subscribe(`/sub/chat/open/${openChatId}`, (message) => {
          try {
            const newMessage = JSON.parse(message.body);
            console.log(newMessage);
            setMessages((prevMessages) => [...prevMessages, newMessage]);
          } catch (error) {
            console.log('subscribe 콜백 함수에서 에러 발생:', error);
          }
        }, {});

        console.log(stompClient.subscriptions);

        stompClient.send(`/pub/chat/open/${openChatId}`, {},
        JSON.stringify({
          messageType: 'OPEN_ENTER',
          roomType: 1,
          roomId: openChatId,
          sender: sender,
          message: null,
        })
      );
      });
    }

    // stompClient.current.connect({}, () => {
    //   // 연결 성공 시 동작 설정
    //   console.log('WebSocket 연결 상태:', stompClient.current.connected);
    //   stompClient.subscribe(`/sub/chat/open/${openChatId}`, (message) => {
    //     try {
    //       const newMessage = JSON.parse(message.body);
    //       setMessages((prevMessages) => [...prevMessages, newMessage]);
    //     } catch (error) {
    //       console.log('subscribe 콜백 함수에서 에러 발생:', error);
    //     }
    //   });
    //   console.log(stompClient.subscriptions);

    //   stompClient.current.send(`/pub/chat/open/${openChatId}`, {},
    //     JSON.stringify({
    //       messageType: 'OPEN_ENTER',
    //       roomType: 2,
    //       roomId: openChatId,
    //       sender: sender,
    //       message: null,
    //     })
    //   );

    // });

    // 컴포넌트 언마운트 시 WebSocket 연결 해제
    return () => {
      if (stompClient) {
        stompClient.disconnect();
      }
    };
  }, [openChatId, stompClient]);

  const handleFormSubmit = (e) => {
    e.preventDefault(); // 폼 제출 기능 비활성화

    if (inputMyText.trim() !== '') {


      if (stompClient && stompClient.connected) {
        stompClient.send(`/pub/chat/open/${openChatId}`, {}, JSON.stringify({
          messageType: 'OPEN_TALK',
          roomType: 1,
          roomId: openChatId,
          sender: sender,
          message: inputMyText,
        }));
      }
    }
  };

  return (
    <div style={chatContainerStyle}>
      <div>
        {messages.map((message, index) =>
          message.sender === sender ? (
            <MyTalk key={index} talk={message.message} />
          ) : (
            <OpponentTalk key={index} talk={message.message} />
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

export default ChattingArea;