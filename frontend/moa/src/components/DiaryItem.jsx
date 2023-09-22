import React, { useState, useEffect } from 'react';
import { diaryApi } from '../api/diaryApi';

function DiaryItem({ exchangeDiaryId }) {
  const [diaryContent, setDiaryContent] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [date, setDate] = useState('');
  const [name, setName] = useState('');

  useEffect(() => {
    diaryApi.getDiaryDetail(exchangeDiaryId)
    .then((response) => {
      const res = response.data;
      const member = res.member;
      console.log(res);
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


  return (
    <div>
      <div>
        <p>이미지 component</p>
      </div>
      <div>
        <div>
          <h5>{ name }</h5>
          <h6>{ date }</h6>
        </div>
        <div>
          <h4>{ diaryContent }</h4>
        </div>
      </div>
      <hr />
    </div>
  );
}

export default DiaryItem;