import React, { useState, useEffect } from 'react';

import BackButton from '../../../components/BackButton';
import BalanceGameListItem from '../../../components/BalanceGame/BalanceGameListItem';

function UpdateBalanceGame(props) {
  const [balanceGameList, setBalanceGameList] = useState([]);
  const [selectedTime, setSelectedTime] = useState("30초"); // 선택된 시간 추가
  
  useEffect(() => {
    const initialList = Array.from({ length: 3 }, (_, index) => (
      <BalanceGameListItem key={index} />
    ));
    setBalanceGameList(initialList);
  }, []);
  
  const addBalanceGame = () => {
    if (balanceGameList.length < 10) {
      setBalanceGameList([...balanceGameList, <BalanceGameListItem key={balanceGameList.length} />]);
    }
  };
  
  const removeBalanceGame = () => {
    if (balanceGameList.length > 3) {
      const updatedList = [...balanceGameList];
      updatedList.pop();
      setBalanceGameList(updatedList);
    }
  };
  
  const isAddButtonDisabled = balanceGameList.length >= 10;
  const isRemoveButtonDisabled = balanceGameList.length <= 3;
  
  const handleTimeSelection = (time) => {
    setSelectedTime(time);
  };

  return (
    <div>
      <h1>밸런스 게임 수정</h1>
      <div>
        <div>
          <label htmlFor="gameTitle">제목</label>
          <input type="text" id="gameTitle" />
        </div>

        <hr />

        <div>
          <h4>밸런스 게임 목록</h4>
          {balanceGameList}
          <button onClick={addBalanceGame} disabled={isAddButtonDisabled}>+</button>
          <button onClick={removeBalanceGame} disabled={isRemoveButtonDisabled}>-</button>
        </div>

        <hr />

        <div>
          <h4>제한시간</h4>
          <label>
            <input
              type="radio"
              name="time"
              value="30초"
              checked={selectedTime === "30초"}
              onChange={() => handleTimeSelection("30초")}
            />
            30초
          </label>
          <label>
            <input
              type="radio"
              name="time"
              value="60초"
              checked={selectedTime === "60초"}
              onChange={() => handleTimeSelection("60초")}
            />
            60초
          </label>
          <label>
            <input
              type="radio"
              name="time"
              value="90초"
              checked={selectedTime === "90초"}
              onChange={() => handleTimeSelection("90초")}
            />
            90초
          </label>
        </div>
      </div>
      <hr />
      <button>수정하기</button>
      <hr />
      <BackButton />
        
    </div>
  );
}

export default UpdateBalanceGame;