import React, { useState } from 'react';
import { balanceGameApi } from '../../api/balanceGameApi';


import BackButton from '../Buttons/BackButton';

function ReactionChoice({ balanceGameId }) {
  const [selectedButton, setSelectedButton] = useState(null);

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

  return (
    <div>
      <h4>이 게임 어땠어요?</h4>
      <button
        onClick={() => handleButtonClick("좋았어요!")}
        style={{
          backgroundColor: selectedButton === "좋았어요!" ? 'green' : 'gray',
          color: 'white'
        }}
      >
        좋았어요!
      </button>
      <button
        onClick={() => handleButtonClick("그럭저럭")}
        style={{
          backgroundColor: selectedButton === "그럭저럭" ? 'green' : 'gray',
          color: 'white'
        }}
      >
        그럭저럭
      </button>
      <button
        onClick={() => handleButtonClick("아쉬워요 ㅠㅠ")}
        style={{
          backgroundColor: selectedButton === "아쉬워요 ㅠㅠ" ? 'green' : 'gray',
          color: 'white'
        }}
      >
        아쉬워요 ㅠㅠ
      </button>
      <hr />
      <div onClick={registerReaction}>
        <BackButton />
      </div>
    </div>
  );
}

export default ReactionChoice;
