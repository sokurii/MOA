import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";

import { balanceGameApi } from '../../../api/balanceGameApi';

import BackButton from '../../../components/BackButton';
import BalanceGameCardItem from '../../../components/BalanceGame/BalanceGameCardItem';

const createBalanceGameStyle = {
  backgroundImage: `
    url(${process.env.PUBLIC_URL}/assets/Background/buddy_background.png)
  `,
  backgroundSize: 'cover', // 배경 이미지를 화면에 맞게 늘리고 자릅니다.
  backgroundRepeat: 'no-repeat', // 배경 이미지 반복 없음
  backgroundPosition: 'center', // 배경 이미지를 가운데 정렬합니다.
  width: '100%', // 화면 전체 너비를 차지하도록 설정
  height: '100vh', // 화면 전체 높이를 차지하도록 설정
};


const appBarStyle = {
  marginBottom: '10px',
  padding: '10px',
  background: 'white',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
};

const pageTitleStyle = {
  marginRight: '110px',
  fontSize: '20px',
  fontWeight: '700',
};

const containerStyle = {
  margin: '20px auto',
};

const inputStyle = {
  margin: '10px auto',
  padding: '10px 20px',
  width: '80%',
  height: '20px',
  backgroundColor: 'white',
  borderRadius: '10px',
  border: 'none',
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
};

const titleStyle = {
  display: 'block',
  margin: '0',
  fontSize: '20px',
  fontWeight: '700',
};

const commentStyle = {
  display: 'block',
  margin: '0',
  fontSize: '14px',
  fontWeight: '400',
};

const buttonStyle = {
  padding: '15px 10px',
  width: '90%',
  color: 'white',
  fontSize: '18px',
  fontWeight: '700',
  border: 'none',
  borderRadius: '18px',
  background: 'linear-gradient(184deg, #ECC2F7 7%, #B17AD3 82%)',
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
};

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
      <BalanceGameCardItem
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
      <BalanceGameCardItem
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
      balanceGameList: balanceGameListItems,
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
    <div style={createBalanceGameStyle}>
      {/* appbar */}
      <div style={appBarStyle}>
        <BackButton />
        <div>
          <p style={pageTitleStyle}>밸런스 게임 생성</p>
        </div>
      </div>

      {/* 제목 */}
      <div style={containerStyle}>
        <div>
          <label style={titleStyle} htmlFor="gameTitle">주제</label>
          <input
            style={inputStyle}
            type="text"
            id="gameTitle"
            value={balanceGameTitle}
            onChange={handleTitleChange}
          />
        </div>
      </div>

      {/* 밸런스게임 카드 */}
      <div style={containerStyle}>
        <p style={titleStyle}>밸런스 게임 카드</p>
        <p style={commentStyle}>최소 3개, 최대 10개까지 생성할 수 있어요</p>
        {balanceGameListItems}
        <button onClick={addBalanceGame} disabled={isAddButtonDisabled}>+</button>
        <button onClick={removeBalanceGame} disabled={isRemoveButtonDisabled}>-</button>
      </div>

      {/* 시간 설정 */}
      <div style={containerStyle}>
        <p style={titleStyle}>제한시간</p>
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

      {/* 생성 버튼 */}
      <div style={containerStyle}>
        <button style={buttonStyle} onClick={createBalanceGame}>게임 만들기</button>
      </div>
    </div>
  );
}

export default CreateBalanceGame;
