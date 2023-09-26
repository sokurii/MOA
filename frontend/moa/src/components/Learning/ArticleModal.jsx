import { learningApi } from '../../api/learningApi';
import React, { Fragment, useState } from 'react';
import styles from './ArticleModal.module.css';

function ArticleModal(props) {
  const { word, onCloseModal, translatedWord } = props.modalProps;
  return (
    <Fragment>
      <div className={styles.modalBackground} onClick={onCloseModal}></div>
      <div className={styles.container}>
        <div className={styles.wordTitle}>
          <div className={styles.wordKoreanTitle}>{word}</div>
          <div className={styles.wordPronunciation}>[Sadan Bobin]</div>
          <button className={styles.scrap}>
            <img src="../../../assets/NewsArticle/scrap.png"></img>
          </button>
        </div>
        <div className={styles.wordTranslation}>
          {translatedWord}
        </div>
        <div className={styles.wordButton}>
          <button className={styles.chatGptButton}>
            GPT에게 <br /> 물어보기
          </button>
          <button className={styles.BuddyButton}>
            버디에게 <br /> 물어보기
          </button>
        </div>
      </div>
    </Fragment>
  );
}

export default ArticleModal;