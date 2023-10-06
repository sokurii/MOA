import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../../styles/Main/Main.module.css';
import { keywordApi } from '../../api/keywordApi';

function LearningHome(props) {
  const [isKeyword, setKeyword] = useState('');
  const navigate = useNavigate()
  const handleClick = () => {
    if(isKeyword.length === 0) {
      navigate('/koreanlearning/default')
    } else {
      navigate('/koreanlearning')
    }
  }
  const navigateTo = (path) => {
      navigate(path); // 3초 후에 페이지 이동
  };

  useEffect(() => {
    keywordApi.getKeywords()
      .then((response) => {
        const res = response.data.response;
        console.log("res: " + JSON.stringify(res));
        setKeyword(res);
      })
  }, []);

  return (
    <div>
      <div onClick={handleClick}  className={styles.cardContainer}>
        <img
          src={process.env.PUBLIC_URL + '/assets/Background/card1.png'}
          alt="뉴스보기"
        />
        <div className={styles.textContainer}>
          <p className={styles.homeTitleFont}>뉴스보기</p>
          <p className={styles.homeSubFont}>
            원하는 키워드 트렌드를 확인하고
            <br />
            그와 관련된 뉴스를 읽어보세요
          </p>
        </div>
      </div>


      <div className={styles.subCardContainer} onClick={() => navigateTo('/koreanlearning/collection')}>
        <img
          src={process.env.PUBLIC_URL + '/assets/Background/card1-1.png'}
          alt="뉴스보기"
        />
        <div className={styles.subTextContainer}>
          <p className={styles.homeTitleFont}>My Collection</p>
          <p className={styles.homeSubFont}>
            더 공부하고 싶은
            <br />
            단어와 뉴스 저장
          </p>
        </div>
      </div>

    </div>
  );
}

export default LearningHome;