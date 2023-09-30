import { learningApi } from '../../api/learningApi';
import React, { Fragment, useEffect, useState } from 'react';
import styles from './ArticleModal.module.css';

function ArticleModal(props) {
  const { word, onCloseModal, translatedWord } = props.modalProps;

  const [isWordScrap, setIsWordScrap] = useState(null);
  const [chatGptAsk, setChatGptAsk] = useState(false);
  const [chatGptAnswer, setChatGptAnswer] = useState('');
  const [text, setText] = useState('');
  const [count, setCount] = useState(0);

  // 타이핑 효과
  useEffect(() => {
    if (chatGptAnswer.length > 0) {
      const interval = setInterval(() => {
        setText(text + chatGptAnswer[count]);
        setCount(count + 1);
      }, 50);
      if (count == chatGptAnswer.length) {
        clearInterval(interval);
      }
      return () => clearInterval(interval)
    }
  })

  // 스크랩 여부 조회
  useEffect(() => {
    learningApi.getIsWordScrap(word)
      .then((response) => {
        if (response.data.response) {
          setIsWordScrap(true);
        }
        else {
          setIsWordScrap(false);
        }
      })
      .catch((error) => {
        console.log('단어 스크랩 여부 조회 오류', error);
      })
  }, [word])

  // 스크랩 등록
  const createWordScrap = () => {
    const data = {
      wordName: word,
      wordMean: '테스트', // 나중에 파파고 번역한 거 값 넘겨주기
    }

    learningApi.createWordScrap(data)
      .then((response) => {
        console.log(response);
        setIsWordScrap(true);
      })
      .catch((error) => {
        console.log('단어 스크랩 등록 오류', error);
      })
  }

  // 스크랩 삭제
  const deleteWordScrap = () => {
    learningApi.deleteWordScrap(word)
      .then((response) => {
        console.log(response);
        setIsWordScrap(false);
      })
      .catch((error) => {
        console.error('단어 스크랩 삭제 오류', error);
      })
  }

  // chatGPT에게 물어보는 상태로 변경
  const goChatGPTAsk = () => {
    setChatGptAsk(true);
    const data = {
      question: "what does " + word + " means in English?",
    }

    learningApi.askToChatGpt(data)
      .then((response) => {
        console.log(response);
        setChatGptAnswer(response.data.response);
      })
      .catch((error) => {
        console.log('chat gpt 오류', error);
      })
  }

  const closeChatGpt = () => {
    setChatGptAsk(false);
    setChatGptAnswer('');
    setText('');
    setCount(0);
  }

  return (
    <Fragment>
      <div className={styles.modalBackground} onClick={onCloseModal}></div>
      <div className={styles.container}>
        {!chatGptAsk && ( // chatGPTAsk가 false일 때만 아래 내용을 렌더링
          <div className={styles.wordTitle}>
            <div className={styles.wordKoreanTitle}>{word}</div>
            {/* <div className={styles.wordPronunciation}>[]</div> */}
            {!isWordScrap &&
              <button className={styles.scrap} onClick={createWordScrap}>
                <img src="../../../assets/NewsArticle/scrap.png"
                  style={{ width: "35px", height: "35px" }}></img>
              </button>
            }
            {isWordScrap &&
              <button className={styles.scrap} onClick={deleteWordScrap}>
                <img src="../../../assets/NewsArticle/scrap_complete.png"
                  style={{ width: "35px", height: "35px" }}></img>
              </button>
            }
          </div>
        )}
        {!chatGptAsk && ( // chatGPTAsk가 false일 때만 아래 내용을 렌더링
          <div className={styles.wordTranslation}>{translatedWord}</div>
        )}
        {!chatGptAsk && ( // chatGPTAsk가 false일 때만 아래 내용을 렌더링
          <div className={styles.wordButton}>
            <button className={styles.chatGptButton}
              onClick={goChatGPTAsk}>
              GPT에게 <br /> 물어보기
            </button>
            <button className={styles.BuddyButton}>
              버디에게 <br /> 물어보기
            </button>
          </div>
        )}
        {chatGptAsk && (
          <div>
            <div className={styles.chatGptTitle}>
              <button className={styles.leftArrow}
                onClick={closeChatGpt}>
                <img src='../../../assets/NewsArticle/left_arrow.png'
                ></img>
              </button>
              <div className={styles.chatGptTitleName}>GPT</div>
            </div>
            <div
              className={styles.chatGPTQuestion}
            >What does {word} means in English?</div>
            <img src='../../../assets/NewsArticle/chat_gpt_logo.png'
              className={styles.chatGptLogo}></img>
            <div className={styles.chatGptAnswerDiv}>
            </div>
            <div
              className={styles.chatGPTAnswer}>
              {text}
            </div>
          </div>

        )}
      </div>
    </Fragment>
  );
}

export default ArticleModal;