import React, { useState, useEffect } from 'react';
import { balanceGameApi } from '../../api/balanceGameApi';
import { useNavigate } from 'react-router';

import BackButton from '../Buttons/BackButton';

const reactionChoiceStyle = {
};

const reactionButtonContainerStyle = {
  display: 'flex',
  justifyContent: 'space-evenly',
  fontFamily: 'Ganpan',
};

const registerReactionButtonStyle = {
  fontFamily: 'Ganpan',
  fontSize: '18px',
  border: 'none',
  borderRadius: '18px',
  padding: '10px',
  width: '90%',
  margin: '10px auto',
  background: 'linear-gradient(184deg, #ECC2F7 7%, #B17AD3 82%)',
}

const howStyle = {
  fontSize: '20px',
};

function ReactionChoice({ balanceGameId }) {
  const [selectedButton, setSelectedButton] = useState(null);

  const navigate = useNavigate();

  const registerReaction = () => {
    if (selectedButton !== null) {
      // 선택한 버튼에 해당하는 reactionId 설정
      const reactionId = getReactionIdForSelectedButton(selectedButton);
      
      const data = {
        balanceGameId: balanceGameId,
        reactionId: reactionId
      };

      // axios 요청 수행
      balanceGameApi.reaction(data)
        .then((response) => {
          console.log(response.data);
          alert('반응이 등록되었습니다!');
          navigate('/buddy/balancegame');
        })
        .catch((error) => {
          console.log('반응 등록 에러 발생');
          console.log(error);
        });
    }
  }

  // 선택한 버튼에 따라 reactionId 반환
  const getReactionIdForSelectedButton = (button) => {
    switch (button) {
      case "좋았어요!":
        return 1; 
      case "그럭저럭":
        return 2; 
      case "아쉬워요 ㅠㅠ":
        return 3; 
      default:
        return null;
    }
  }

  // 버튼 클릭 시 선택한 버튼 업데이트
  const handleButtonClick = (button) => {
    setSelectedButton(button);
  }

  const goodButtonStyle = {
    fontFamily: 'Ganpan',
    border: 'none',
    borderRadius: '60px',
    padding: '10px',
    background: selectedButton === "좋았어요!" ? '#B88CD3' : 'white',
    color: selectedButton === "좋았어요!" ? 'white' : 'black',
  };
  
  const normalButtonStyle = {
    fontFamily: 'Ganpan',
    border: 'none',
    borderRadius: '60px',
    padding: '10px',
    background: selectedButton === "그럭저럭" ? '#B88CD3' : 'white',
    color: selectedButton === "그럭저럭" ? 'white' : 'black',
  };

  const badButtonStyle = {
    fontFamily: 'Ganpan',
    border: 'none',
    borderRadius: '60px',
    padding: '10px',
    background: selectedButton === "아쉬워요 ㅠㅠ" ? '#B88CD3' : 'white',
    color: selectedButton === "아쉬워요 ㅠㅠ" ? 'white' : 'black',
  };

  return (
    <div style={reactionChoiceStyle}>
      <p style={howStyle}>이 게임 어땠어요?</p>
      <div style={reactionButtonContainerStyle}>
        <button
          onClick={() => handleButtonClick("좋았어요!")}
          style={goodButtonStyle}
        >
          좋았어요!
        </button>
        <button
          onClick={() => handleButtonClick("그럭저럭")}
          style={normalButtonStyle}
        >
          그럭저럭
        </button>
        <button
          onClick={() => handleButtonClick("아쉬워요 ㅠㅠ")}
          style={badButtonStyle}
        >
          아쉬워요 ㅠㅠ
        </button>
      </div>
      <div>
        <button style={registerReactionButtonStyle} onClick={registerReaction}>평가하기</button>
      </div>
    </div>
  );
}

export default ReactionChoice;
