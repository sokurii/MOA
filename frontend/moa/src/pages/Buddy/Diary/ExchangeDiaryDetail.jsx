import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';
import { useLocation } from 'react-router-dom';
import { diaryApi } from '../../../api/diaryApi';

import styles from '../Diary/ExchangeDiaryDetail.module.css'
import BackButton from '../../../components/BackButton';
import MenuHeader from '../../../components/MenuHeader';

import { WOW } from 'wowjs';
import moment from 'moment';
import 'moment/locale/ko'; // 한국어 로케일 추가

function ExchangeDiaryDetail() {
  const { exchangeDiaryId } = useParams();

  const [diaryContent, setDiaryContent] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [date, setDate] = useState('');
  const [name, setName] = useState('');

  const week = ['일', '월', '화', '수', '목', '금', '토'];


  useEffect(() => {
    console.log(exchangeDiaryId);
    diaryApi.getDiaryDetail(exchangeDiaryId)
      .then((response) => {
        const res = response.data.response;
        const member = res.member;
        console.log(res);
        console.log(member);
        setDiaryContent(res.exchangeDiaryContent);
        setImgUrl(res.exchangeDiaryImgUrl);

        moment.locale('ko');
        const diaryDate = moment(res.exchangeDiaryDate);
        setDate(diaryDate.format('YYYY/MM/DD (ddd)'));
        console.log(date);
        setName(member.memberName);

      })
      .catch((error) => {
        console.log('교환일기 상세조회 오류');
        console.log(error);
      });

  }, [exchangeDiaryId]);

  useEffect(() => {
    // wowjs 초기화
    const wow = new WOW();
    wow.init();
    wow.sync();
  }, []);

  const navigate = useNavigate();

  const handleUpdateExchangeDiaryClick = () => {
    navigate(`/buddy/exchangediary/${exchangeDiaryId}/update`, {
      state: { exchangeDiaryId }, // 밸런스게임 데이터를 state에 전달
    });
  };

  return (
    <div>
      <div className={styles.container}>
        <MenuHeader title="교환일기"></MenuHeader>
        <div className={styles.diaryInside + ' wow fadeInLeft'} >
          <img
            className={styles.diaryInsideImg}
            src={process.env.PUBLIC_URL + '/assets/ExchangeDiary/diary_inside.png'}></img>
          <div className={styles.diaryDate}>{date}</div>

          <div className={styles.diaryPhoto}>
            <img
              src='https://storage.googleapis.com/diary_storage/diary/1f074c33-7959-41ad-97a7-31093d6997f2'
              style={{ maxWidth: '100%', maxHeight: '100%' }}></img>
          </div>

          <div className={styles.diaryContent}>
            {diaryContent}
          </div>

          <div className={styles.moveToNextPage}>
            버디가 쓴 일기 보기 &gt;
          </div>
        </div>



      </div>
      {/* {exchangeDiaryId} 번 다이어리 */}

      {/* < div >
        <button onClick={() => handleUpdateExchangeDiaryClick()}>수정하기</button>
        <button>삭제하기</button>
      </div > */}

      {/* <div>
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
