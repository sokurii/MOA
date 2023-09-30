import React, { useEffect, useRef, useState } from 'react';
import { diaryApi } from '../../../api/diaryApi';
import { useNavigate } from 'react-router-dom';
import MenuHeader from '../../../components/MenuHeader';
import styles from '../Diary/CreateExchangeDiary.module.css'

import { WOW } from 'wowjs';


function CreateExchangeDiary() {
  const [exchangeDiaryContent, setExchangeDiaryContent] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [todayDate, setTodayDate] = useState(null);

  const imgRef = useRef(null);

  useEffect(() => {
    const today = new Date();
    const week = ['일', '월', '화', '수', '목', '금', '토'];
    setTodayDate(`${today.getFullYear()}/${today.getMonth() + 1}/${today.getDate()} (${week[today.getDay()]})`);
  }, [])

  useEffect(() => {
    // wowjs 초기화
    const wow = new WOW();
    wow.init();
  }, []);

  const navigate = useNavigate();

  const handleContentChange = (e) => {
    setExchangeDiaryContent(e.target.value);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImageFile(event.target.result);
      };
      reader.readAsDataURL(file);
    }
    else {
      alert('이미지 파일을 선택해주세요!');
    }
  };

  const exchangeDiaryRequest = {
    exchangeDiaryContent: exchangeDiaryContent,
  };

  const createDiary = () => {
    const formData = new FormData();

    const jsonBlob = new Blob([JSON.stringify(exchangeDiaryRequest)], { type: "application/json" });

    formData.append('exchangeDiaryRequest', jsonBlob);

    if (imgRef.current.files[0]) {
      formData.append('multipartFile', imgRef.current.files[0]);
    }

    const headers = {
      'Content-Type': 'multipart/form-data',
    };

    diaryApi.createDiary(formData, { headers })
      .then((response) => {
        if (response.data.success) {
          alert('일기가 생성되었습니다!');
          navigate('/buddy/exchangediary');
        } else {
          console.log('교환일기 생성 실패:', response.data.error.message);
        }
      })
      .catch((error) => {
        console.error('교환일기 생성 에러 발생:', error);
      });
  };



  return (
    <div>
      <div className={styles.container}>
        <MenuHeader title="일기쓰기"></MenuHeader>
        <div className={styles.diaryInside + ' wow fadeInLeft'}>
          <img
            className={styles.diaryInsideImg}
            src={process.env.PUBLIC_URL + '/assets/ExchangeDiary/diary_inside.png'}></img>
          <div className={styles.diaryDate}>{todayDate}</div>

          <div className={styles.diaryPhoto}>
            {!imageFile ? (
              <label htmlFor='diaryImage'>
                <img
                  src={process.env.PUBLIC_URL + '/assets/ExchangeDiary/diary_upload_photo.png'}></img>
              </label>
            ) : <img
              src={imageFile}
              style={{ maxWidth: '100%', maxHeight: '100%' }}></img>}
          </div>

          <div>
            <label htmlFor="diaryContent"></label>
            <textarea
              id="diaryContent"
              className={styles.diaryContentInput}
              value={exchangeDiaryContent}
              onChange={handleContentChange}
            />
          </div>

          <button
            className={styles.diaryCreateButton}
            onClick={createDiary}>다 썼어요</button>

          <input
            style={{ display: "none" }}
            type="file"
            id="diaryImage"
            accept="image/*"
            ref={imgRef}
            onChange={handleImageChange}
          />
        </div>
      </div>
    </div>
  );
}

export default CreateExchangeDiary;