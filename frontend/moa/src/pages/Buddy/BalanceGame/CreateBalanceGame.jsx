import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";

import { balanceGameApi } from '../../../api/balanceGameApi';

import BackButton from '../../../components/BackButton';
import BalanceGameListItem from '../../../components/BalanceGame/BalanceGameListItem';

function CreateBalanceGame(props) {
  const [balanceGameListItems, setBalanceGameListItems] = useState([]);
  const [selectedTime, setSelectedTime] = useState(30); // 선택된 시간 추가
  const [balanceGameTitle, setBalanceGameTitle] = useState('');

  const navigate = useNavigate();

  // 제목 업데이트
  const handleTitleChange = (e) => {
    setBalanceGameTitle(e.target.value);
  };

  useEffect(() => {
    // 처음 렌더링 시에 3개의 BalanceGameListItem 생성
    const initialList = Array.from({ length: 3 }, (_, index) => (
      <BalanceGameListItem
        key={index}
        index={index}
        updateBalanceGameList={updateBalanceGameList}
      />
    ));
    setBalanceGameListItems(initialList);
  }, []);

  // 밸런스게임 항목 추가 및 삭제
  const addBalanceGame = () => {
    if (balanceGameListItems.length < 10) {
      setBalanceGameListItems([...balanceGameListItems,
      <BalanceGameListItem
        key={balanceGameListItems.length}
        index={balanceGameListItems.length}
        updateBalanceGameList={updateBalanceGameList}
      />]);
    }
  };

  const removeBalanceGame = () => {
    if (balanceGameListItems.length > 3) {
      const updatedList = [...balanceGameListItems];
      updatedList.pop();
      setBalanceGameListItems(updatedList);
    }
  };

  const isAddButtonDisabled = balanceGameListItems.length >= 10;
  const isRemoveButtonDisabled = balanceGameListItems.length <= 3;

  // 시간 설정
  const handleTimeSelection = (time) => {
    setSelectedTime(time);
  };

  // 밸런스게임 생성 api
  const [balanceGameList, setBalanceGameList] = useState([]);

  const updateBalanceGameList = (index, side, value) => {
    setBalanceGameList((prevList) => {
      const newList = [...prevList];
      if (!newList[index]) {
        newList[index] = {};
      }
      newList[index][side] = value;
      newList[index].balanceOrder = index + 1;
      return newList;
    });
  };

  const createBalanceGame = () => {
    const data = {
      balanceGameTitle: balanceGameTitle,
      balanceGameTime: selectedTime,
      balanceGameList: balanceGameList,
    }

    balanceGameApi.createBalanceGame(data)
    .then((response) => {
      console.log(response);
      alert('게임이 생성되었습니다!');
      navigate('/buddy/balancegame/');
    })
    .catch((error) => {
      console.log('밸런스게임 생성 오류 발생');
      console.log(error);
    })
  }

  return (
    <div>
      <h1>밸런스 게임 생성</h1>
      <div>
        <div>
          <label htmlFor="gameTitle">제목</label>
          <input
            type="text"
            id="gameTitle"
            value={balanceGameTitle}
            onChange={handleTitleChange}
          />
        </div>

        <hr />

        <div>
          <h4>밸런스 게임 목록</h4>
          {balanceGameListItems}
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
              checked={selectedTime === 30}
              onChange={() => handleTimeSelection(30)}
            />
            30초
          </label>
          <label>
            <input
              type="radio"
              name="time"
              value="60초"
              checked={selectedTime === 60}
              onChange={() => handleTimeSelection(60)}
            />
            60초
          </label>
          <label>
            <input
              type="radio"
              name="time"
              value="90초"
              checked={selectedTime === 90}
              onChange={() => handleTimeSelection(90)}
            />
            90초
          </label>
        </div>
      </div>
      <hr />
      <button onClick={createBalanceGame}>생성하기</button>
      <hr />
      <BackButton />
    </div>
  );
}

export default CreateBalanceGame;
