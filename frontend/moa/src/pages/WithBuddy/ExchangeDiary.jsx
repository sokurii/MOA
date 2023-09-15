import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';

import BackButton from '../../components/BackButton';
import DiaryItem from '../../components/DiaryItem';

function ExchangeDiary(props) {
  const [diaries, setDiaries] = useState([
    { id: 1, title: '제목1', content: '내용1', image: '이미지1', date: '2023.09.14', time: '10:25' },
    { id: 2, title: '제목2', content: '내용2', image: '이미지2', date: '2023.09.14', time: '10:26' },
  ]);

  const navigate = useNavigate();

  const handleDiaryClick = (diary) => {
    navigate(`/withbuddy/exchangediary/${diary.id}`, {
      state: { diary }, // 다이어리 데이터를 state에 전달
    });
  };

  return (
    <div>
      <p>교환일기</p>

      <div>
        <Link to="/withbuddy/exchangediary/create">
          <button>생성하기</button>
        </Link>
      </div>

      {/* 검색 필터 */}
      <div>
        <label htmlFor="searchInput">검색 | </label>
        <input type="text" id="searchInput" />
      </div>

      <hr />

      {/* 일기 리스트에 따른 일기 나열 */}
      {/* 같은 날짜일 때 묶어서 component화 해야함 */}
      {diaries.map((diary, index) => {
        return (
          <div key={index} onClick={() => handleDiaryClick(diary)}>
            <DiaryItem
              title={diary.title}
              image={diary.image}
              date={diary.date}
              time={diary.time}
            />
          </div>
        );
      })}

      <BackButton />
    </div>
  );
}

export default ExchangeDiary;
