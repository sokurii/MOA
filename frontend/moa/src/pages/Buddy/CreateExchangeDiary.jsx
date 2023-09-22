import React, { useState, useEffect } from 'react';
import { diaryApi } from '../../api/diaryApi';

import { useNavigate } from 'react-router-dom';

import BackButton from '../../components/BackButton';

function CreateExchangeDiary(props) {
  const [exchangeDiaryContent, setExchangeDiaryContent] = useState('');
  const [imageFile, setImageFile] = useState(null);

  const navigate = useNavigate();

  const handleContentChange = (e) => {
    setExchangeDiaryContent(e.target.value);
  };
  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]); // 이미지 파일 설정
  };

  const createDiary = () => {
    const exchangeDiaryRequest = {
      exchangeDiaryContent: exchangeDiaryContent,
    };

    const formData = new FormData();
    const jsonBlob = new Blob([JSON.stringify(exchangeDiaryRequest)], { type: "application/json" });

    formData.append('saveOpenChatRequest', jsonBlob);
    formData.append('multipartFile', imageFile);

    const headers = {
      'Content-Type': 'multipart/form-data',
    };

    diaryApi.createDiary(formData, { headers })
    .then((response) => {
      navigate('/buddy/exchangediary');
    })
    .catch((error) => {
      console.log('교환일기 생성 에러 발생');
      console.log(error);
    })


  }
  return (
    <div>
      <BackButton />
      <h1>교환일기 작성</h1>
      <div>
        <label htmlFor="diaryImage">이미지 업로드</label>
        <input
          type="file"
          id="diaryImage"
          accept="image/*"
          onChange={handleImageChange}
        />
      </div>
      <div>
        <label htmlFor="diaryContent">설명</label>
        <input
          type="text"
          id="diaryContent"
          value={exchangeDiaryContent}
          onChange={handleContentChange}
        />
      </div>
      <hr />
      <button onClick={createDiary}>생성하기</button>
    </div>
  );
}

export default CreateExchangeDiary;