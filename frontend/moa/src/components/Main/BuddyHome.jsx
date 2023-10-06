import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { setIsLoading } from '../../store/isLoading';
import { useAppDispatch } from '../../store';
import styles from '../../styles/Main/Main.module.css';


function BuddyHome(props) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  // 페이지 이동 함수
  const navigateTo = (path) => {
      navigate(path); // 3초 후에 페이지 이동
  };

  return (
    <div>
      <div className={styles.cardContainer} onClick={() => navigateTo('/buddy/exchangediary')}>
        <img
          src={process.env.PUBLIC_URL + '/assets/Background/card3.png'}
          alt="교환일기 보기"
        />
        <div className={styles.textContainer}>
          <p className={styles.homeTitleFont}>버디와 교환일기</p>
          <p className={styles.homeSubFont}>
            오늘 하루 어떤 일이 있었나요?
            <br />
            버디와 일상을 기록하고 공유해요
          </p>
        </div>
      </div>

      <div className={styles.buddyCards}>
        <div className={styles.subBuddyContainer} onClick={() => navigateTo('/buddy/balancegame')}>
          <img
            src={process.env.PUBLIC_URL + '/assets/Background/card3-1.png'}
            alt="밸런스게임보기"
          />
          <div className={styles.subTextContainer}>
            <p className={styles.buddyTitleFont}>밸런스게임</p>
            <p className={styles.buddySubFont}>
              A vs B ?!
              <br />
              버디와 놀기
            </p>
          </div>
        </div>
        
        <div className={styles.subBuddyContainer} onClick={() => navigateTo('/buddy/koreatour')}>
          <img
            src={process.env.PUBLIC_URL + '/assets/Background/card3-2.png'}
            alt="한국여행보기"
          />
          <div className={styles.subTextContainer}>
            <p className={styles.buddyTitleFont}>한국여행</p>
            <p className={styles.buddySubFont}>
              내가 찾던
              <br />
              바로 그 장소
            </p>
          </div>
        </div>

      </div>

  </div>
  );
}

export default BuddyHome;