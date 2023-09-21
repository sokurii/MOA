import React, { useState } from 'react';
import MyTalk from '../MyTalk';
import OpponentTalk from '../OpponentTalk';

const chatContainerStyle = {
  margin: '20px',
  border: '1px solid #ccc',
  padding: '20px',
  borderRadius: '5px',
};

function ChattingArea(props) {
  const [inputMyText, setInputMyText] = useState(''); // 나의 텍스트 입력 상태
  const [inputOpponentText, setInputOpponentText] = useState(''); // 상대방 텍스트 입력 상태
  const [messages, setMessages] = useState([]); // 대화 메세지 저장용

  // 나의 텍스트 입력 필드의 onChange 이벤트 핸들러
  const handleMyInputChange = (e) => {
    setInputMyText(e.target.value);
  };

  // 상대방 텍스트 입력 필드의 onChange 이벤트 핸들러
  const handleOpponentInputChange = (e) => {
    setInputOpponentText(e.target.value);
  };

  // 나의 텍스트 입력 필드의 onKeyDown 이벤트 핸들러
  const handleMyInputKeyDown = (e) => {
    if (e.key === 'Enter' && inputMyText.trim() !== '') {
      // 엔터 키를 누르면 나의 메시지를 배열에 추가합니다.
      setMessages([...messages, { text: inputMyText, isMine: true }]);
      setInputMyText('');
    }
  };

  // 상대방 텍스트 입력 필드의 onKeyDown 이벤트 핸들러
  const handleOpponentInputKeyDown = (e) => {
    if (e.key === 'Enter' && inputOpponentText.trim() !== '') {
      // 엔터 키를 누르면 상대방 메시지를 배열에 추가합니다.
      setMessages([...messages, { text: inputOpponentText, isMine: false }]);
      setInputOpponentText('');
    }
  };

  return (
    <div style={chatContainerStyle}>
      <div>
        <h4>대화상대 이름</h4>
      </div>
      <hr />
      <div>
        {/* 대화 메세지 출력 */}
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
          onChange={handleMyInputChange}
          onKeyDown={handleMyInputKeyDown}
          placeholder="채팅"
        />
        {/* 테스트용 상대방 채팅 입력 필드 */}
        <input
          type="text"
          value={inputOpponentText}
          onChange={handleOpponentInputChange}
          onKeyDown={handleOpponentInputKeyDown}
          placeholder="테스트용 상대방 채팅"
        />
      </div>
    </div>
  );
}

export default ChattingArea;
