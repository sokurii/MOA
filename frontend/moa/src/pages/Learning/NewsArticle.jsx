
import React, { useCallback, useEffect, useState } from 'react';
import { learningApi } from '../../api/learningApi';
import styles from './NewsArticle.module.css'

function NewsArticle(props) {


    const articleSentences = [
        "신인 보이그룹 제로베이스원(ZEROBASEONE) 리더 성한빈이 엠넷 음악방송 '엠카운트다운' 새 MC가 됐다.",
        "소속사 웨이크원은 성한빈이 '엠카운트다운'의 새 MC가 되어 오는 7일 방송부터 시청자들을 만난다고 1일 밝혔다.",
        "성한빈은 소속사를 통해 어릴 때부터 '엠카운트다운'을 보면서 꿈을 키워 왔는데 MC로 시청자분들을 뵙게 되어 영광이고, 행복하다. ",
        "많은 선배님들과 동료분들을 가까이서 만나서 더 많이 배우고 성장할 수 있을 것 같아 기대된다.",
        "지금까지 보여 드린 모습과는 다른 성한빈의 다양한 매력을 보여드릴 테니 제로즈(공식 팬덤명) 분들도 많이 기대해 주셨으면 한다라고 소감을 전했다."
    ]

    const articleWords = [
        "신인", "시청자", "소속사", "꿈", "영광", "행복", "동료", "성장", "모습", "기대", "소감"
    ]

    const [currentSentenceIndex, setCurrentSentenceIndex] = useState(0);
    const [translatedSentence, setTranslatedSentence] = useState('');

    useEffect(() => {
        translateSentence(articleSentences[currentSentenceIndex]);
    }, [currentSentenceIndex]);

    const goToNextIndex = () => {
        if (currentSentenceIndex < articleSentences.length - 1) {
            setCurrentSentenceIndex(currentSentenceIndex + 1);
        }
    };

    const goToPreviousIndex = () => {
        if (currentSentenceIndex > 0) {
            setCurrentSentenceIndex(currentSentenceIndex - 1);
        }
    }

    // 정규 표현식을 사용하여 문장을 단어로 분리
    const splitSentenceIntoWords = (sentence) => {
        return sentence.split(/\s+/);
    }

    // 문장 단어를 받아 일치 여부 확인
    const isWordMatching = (sentence, word) => {
        const wordsInSentence = splitSentenceIntoWords(sentence);
        return wordsInSentence.some((w) => w.includes(word));
    }

    // 번역
    const translateSentence = async (sentence) => {
        try {
            const response = await learningApi.translateText(sentence);
            setTranslatedSentence(response.data.response);
        }
        catch (error) {
            console.error('번역 요청 실패', error);
        }

    }

    let voices = [];

    //TTS

    useEffect(() => {
        setVoiceList();
    })

    const setVoiceList = () => {
        voices = window.speechSynthesis.getVoices();
    };

    if (window.speechSynthesis.onvoiceschanged !== undefined) {
        window.speechSynthesis.onvoiceschanged = setVoiceList;
    }

    const speech = (text) => {
        const lang = "ko-KR";
        let utterThis = new SpeechSynthesisUtterance(text);

        utterThis.lang = lang;
        utterThis.rate = 0.8;

        const korVoice = voices.find(
            (elem) => elem.lang === lang || elem.lang === lang.replace("-", "_")
        );

        if (korVoice) {
            utterThis.voice = korVoice;
        } else {
            return;
        }

        window.speechSynthesis.speak(utterThis);
    };

    // 녹음 기능 구현


    return (
        <div className={styles.container}>
            <img src="../../../assets/NewsArticle/background-img.png" className={styles.backgroundImg}></img>
            <div className={styles.articleTitle}>제로베이스원 리더 성한빈, '엠카' 새 MC</div>
            <div className={styles.articleDate}>2023.09.24</div>
            <button className={styles.listenToSound} onClick={() =>
                speech(articleSentences[currentSentenceIndex])}>
                <img src="../../../assets/NewsArticle/listen-to-sound.png" alt=""></img>
            </button>
            <button className={styles.recordSound}>
                <img src="../../../assets/NewsArticle/record-sound.png"></img>
            </button>
            <button className={styles.scrap}>
                <img src="../../../assets/NewsArticle/scrap.png"></img>
            </button>
            <div className={styles.articleContent}>
                <div className={styles.articleSentences}>
                    <div>
                        {splitSentenceIntoWords(articleSentences[currentSentenceIndex]).map((word, index) => (
                            <span
                                key={index}
                                className={articleWords.some((highlightWord) =>
                                    isWordMatching(word, highlightWord)
                                )
                                    ? styles.highlightWord : ''}>{word}{' '}</span>
                        ))}
                    </div>
                    <div>{translatedSentence} </div>
                </div>
            </div>
            <div className={styles.pageMoving}>
                <button onClick={goToPreviousIndex} className={styles.pageButton}>이전</button>
                <p className={styles.pageNumbers}>
                    {currentSentenceIndex + 1} / {articleSentences.length}</p>
                <button onClick={goToNextIndex} className={styles.pageButton}>다음</button>
            </div>
        </div>
    );

}

export default NewsArticle;