import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { diaryApi } from '../../../api/diaryApi';
import { userApi } from '../../../api/userApi';

import { Link } from 'react-router-dom';
import styles from '../Diary/ExchangeDiaryDetail.module.css'
import MenuHeader from '../../../components/ETC/MenuHeader';

import { WOW } from 'wowjs';
import moment from 'moment';
import 'moment/locale/ko'; // 한국어 로케일 추가

function ExchangeDiaryDetail() {
  const { exchangeDiaryDate } = useParams();

  const [memberIsForeigner, setMemberIsForeigner] = useState();

  const [date, setDate] = useState('');

  const [diaries, setDiaries] = useState();
  const [myDiary, setMyDiary] = useState();
  const [buddyDiary, setBuddyDiary] = useState();

  const [isMyDiary, setIsMyDiary] = useState(true);

  const week = ['일', '월', '화', '수', '목', '금', '토'];

  useEffect(() => {
    userApi.getMemberInfo()
      .then((response) => {
        const res = response.data.response;
        if (res.memberIsForeigner) {
          setMemberIsForeigner(true);
        }
        else {
          setMemberIsForeigner(false);
        }
      })
      .catch((error) => {
        console.error("다이어리 멤버 조회 오류", error);
      })
  }, [])

  useEffect(() => {
    diaryApi.getDiaryDetail(exchangeDiaryDate)
      .then((response) => {
        const diaries = response.data.response;
        setDiaries(diaries);

        moment.locale('ko');
        const diaryDate = moment(diaries[0].exchangeDiaryDate);
        setDate(diaryDate.format('YYYY/MM/DD (ddd)'));
      })
      .catch((error) => {
        console.log('교환일기 상세조회 오류');
        console.log(error);
      });
  }, [exchangeDiaryDate]);

  // 교환 일기 설정
  useEffect(() => {
    if (diaries) {
      diaries.forEach((diary) => {
        if (memberIsForeigner === diary.member.memberIsForeigner) {
          setMyDiary(diary);
        }
        else {
          setBuddyDiary(diary);
        }

      })
    }
  }, [diaries])

  useEffect(() => {
    // wowjs 초기화
    const wow = new WOW();
    wow.init();
    wow.sync();
  }, []);

  const moveToBuddyDiaryPage = () => {
    setIsMyDiary(false);
  }

  const moveToMyDiaryPage = () => {
    setIsMyDiary(true);
  }

  return (
    <div>
      <div className={styles.container}>
        <MenuHeader title="교환일기"></MenuHeader>
        <div className={styles.diaryInside + ' wow fadeInLeft'} >
          {isMyDiary &&
            <>
              {myDiary &&
                <>
                  <img
                    className={styles.diaryInsideImg}
                    src={process.env.PUBLIC_URL + '/assets/ExchangeDiary/diary_inside.png'}></img>
                  <div className={styles.diaryDate}>{date}</div>

                  <div className={styles.diaryPhoto}>
                    <img
                      src={myDiary.exchangeDiaryImgUrl}
                      style={{ maxWidth: '100%', maxHeight: '100%' }}></img>
                  </div>

                  <div className={styles.diaryContent}>
                    {myDiary.exchangeDiaryContent.replace(/<br>/g, "\n")}
                  </div>

                  <div className={styles.moveToNextPage}
                    onClick={moveToBuddyDiaryPage}>
                    버디가 쓴 일기 보기 &gt;
                  </div>
                </>
              }
              {!myDiary &&
                <>
                  <img
                    className={styles.diaryInsideImg}
                    src={process.env.PUBLIC_URL + '/assets/ExchangeDiary/diary_inside.png'}></img>
                  <div className={styles.diaryDate}>{date}</div>

                  <div className={styles.diaryNoContent}>
                    <img
                      src={process.env.PUBLIC_URL + '/assets/ExchangeDiary/diary_lock.png'}></img>
                    <div
                      className={styles.diaryNoContentDesc}>
                      일기를 <br />
                      작성하지 않았어요
                    </div>
                    <Link to="/buddy/exchangediary/create">
                      <button
                        className={styles.diaryNoContentBtn}>일기쓰기</button>
                    </Link>
                  </div>

                  <div className={styles.moveToNextPage}
                    onClick={moveToBuddyDiaryPage}>
                    버디가 쓴 일기 보기 &gt;
                  </div>
                </>
              }
            </>
          }

          {!isMyDiary &&
            <>
              {buddyDiary &&
                <>
                  <img
                    className={styles.diaryInsideImg}
                    src={process.env.PUBLIC_URL + '/assets/ExchangeDiary/diary_inside.png'}></img>
                  <div className={styles.diaryDate}>{date}</div>

                  <div className={styles.diaryPhoto}>
                    <img
                      src={buddyDiary.exchangeDiaryImgUrl}
                      style={{ maxWidth: '100%', maxHeight: '100%' }}></img>
                  </div>

                  <div className={styles.diaryContent}>
                    {buddyDiary.exchangeDiaryContent}
                  </div>

                  <div className={styles.moveToNextPage}
                    onClick={moveToMyDiaryPage}>
                    내가 쓴 일기 보기 &gt;
                  </div>
                </>
              }
              {!buddyDiary &&
                <>
                  <img
                    className={styles.diaryInsideImg}
                    src={process.env.PUBLIC_URL + '/assets/ExchangeDiary/diary_inside.png'}></img>
                  <div className={styles.diaryDate}>{date}</div>

                  <div className={styles.diaryNoContent}>
                    <img
                      src={process.env.PUBLIC_URL + '/assets/ExchangeDiary/diary_lock.png'}></img>
                    <div
                      className={styles.diaryNoContentDesc}>
                      버디가 일기를 <br />
                      작성하지 않았어요
                    </div>
                    <button
                      className={styles.diaryNoContentBtn}>버디에게 채팅하기</button>
                  </div>

                  <div className={styles.moveToNextPage}
                    onClick={moveToMyDiaryPage}>
                    내가 쓴 일기 보기 &gt;
                  </div>
                </>}
            </>

          }
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
      <hr /> */}
    </div >
  );
}

export default ExchangeDiaryDetail;
