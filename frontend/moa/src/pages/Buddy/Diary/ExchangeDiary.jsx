import React, { useState, useEffect } from 'react';

import { useSelector } from 'react-redux';

import { diaryApi } from '../../../api/diaryApi';

import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';

import BackButton from '../../../components/BackButton';
import DiaryItem from '../../../components/DiaryItem';

function ExchangeDiary(props) {
  const [diaries, setDiaries] = useState([]);

  useEffect(() => {
    diaryApi.getDiaryList()
    .then((response) => {
      console.log(response.data);
      setDiaries(response.data.response);
    })
    .catch((e) => {
      const error = e.error;
      console.log('교환일기 전체 조회 에러 발생');
      console.log(e);
    })
  }, []);

  const navigate = useNavigate();

  const handleDiaryClick = (exchangeDiaryId) => {
    navigate(`/buddy/exchangediary/${exchangeDiaryId}`, {
      state: { exchangeDiaryId }, // 다이어리 데이터를 state에 전달
    });
  };

  return (
    <div>
      <p>교환일기</p>

      <div>
        <Link to="/buddy/exchangediary/create">
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
        const exchangeDiaryId = diary.exchangeDiaryId;

        return (
          <div key={index} onClick={() => handleDiaryClick(exchangeDiaryId)}>
            <DiaryItem
              exchangeDiaryId={exchangeDiaryId}
            />
          </div>
        );
      })}

      <BackButton />
    </div>
  );
}

export default ExchangeDiary;
