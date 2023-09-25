import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useLocation } from 'react-router-dom';
import { diaryApi } from '../../../api/diaryApi';

import BackButton from '../../../components/BackButton';

function ExchangeDiaryDetail({ exchangeDiaryId }) {
  const [diaryContent, setDiaryContent] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [date, setDate] = useState('');
  const [name, setName] = useState('');

  useEffect(() => {
    diaryApi.getDiaryDetail(exchangeDiaryId)
    .then((response) => {
      const res = response.data;
      const member = res.response.member;
      console.log(res);
      console.log(member);
      setDiaryContent(res.exchangeDiaryContent);
      setImgUrl(res.exchangeDiaryImgUrl);
      setDate(res.exchangeDiaryDate);
      setName(member.memberName);

    })
    .catch((error) => {
      console.log('교환일기 상세조회 오류');
      console.log(error);
    });

  }, [exchangeDiaryId]);

  const navigate = useNavigate();

  const handleUpdateExchangeDiaryClick = () => {
    navigate(`/buddy/exchangediary/${exchangeDiaryId}/update`, {
      state: { exchangeDiaryId }, // 밸런스게임 데이터를 state에 전달
    });
  };

  return (
    <div>
      {exchangeDiaryId} 번 다이어리

      <div>
        <button onClick={() => handleUpdateExchangeDiaryClick()}>수정하기</button>
        <button>삭제하기</button>
      </div>

      <div>
        <p>이미지 들어갈 자리</p>
      </div>
      <div>
        <div>
          <h5>내용 : {diaryContent}</h5>
        </div>
      </div>
      <hr />
      <BackButton />
    </div>
  );
}

export default ExchangeDiaryDetail;
