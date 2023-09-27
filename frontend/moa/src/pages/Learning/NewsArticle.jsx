
import React, { useCallback, useEffect, useState } from 'react';
import { learningApi } from '../../api/learningApi';
import styles from './NewsArticle.module.css'
import ArticleModal from '../../components/Learning/ArticleModal';

function NewsArticle(props) {

    const articleWords = [
        "법원", "출석", "단식"
    ]

    const [currentSentenceIndex, setCurrentSentenceIndex] = useState(0);
    const [translatedSentence, setTranslatedSentence] = useState('');
    const [translatedWord, setTranslatedWord] = useState('');
    const [isNewsScrap, setIsNewsScrap] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false); //모달 관련
    const [clickWord, setClickWord] = useState(null);

    const [articleId, setArticleId] = useState(null);
    const [articleTitle, setArticleTitle] = useState('');
    const [articleContent, setArticleContent] = useState('');
    const [articleSentences, setArticleSentences] = useState([]);
    const [articleDate, setArticleDate] = useState('');
    const [articleUrl, setArticleUrl] = useState('');

    useEffect(() => {
        learningApi.getNews(1)
            .then((response) => {
                const newsData = response.data;
                setArticleId(newsData.article_id);
                setArticleTitle(newsData.title);
                setArticleContent(newsData.content);
                setArticleDate(newsData.date);
                setArticleUrl(newsData.url);

                const sentences = splitTextIntoSentences(newsData.content);
                setArticleSentences(sentences);
            })
            .catch((error) => {
                console.error('기사 조회 에러', error);
            })
    }, []);


    // 스크랩 여부 확인
    useEffect(() => {
        learningApi.getIsNewsScrap(1) // 나중에 articleId 값 받아오면 넣어주기 
            .then((response) => {
                console.log(response.data.response);
                if (response.data.response) {
                    setIsNewsScrap(true);
                }
                else {
                    setIsNewsScrap(false);
                }
            })
            .catch((error) => {
                console.log(error);
            })
    }, [])

    useEffect(() => {
        if (articleSentences.length > 0) {
            translateSentence(articleSentences[0]);
        }
    }, [articleSentences])

    useEffect(() => {
        if (articleSentences.length > 0) {
            translateSentence(articleSentences[currentSentenceIndex]);
        }
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

    const splitTextIntoSentences = (text) => {
        const sentences = text.split('.');
        return sentences.filter((sentence) => sentence.trim() !== '')
            .map((sentence) => sentence.trim() + '.');
    }

    // 정규 표현식을 사용하여 문장을 단어로 분리
    const splitSentenceIntoWords = (sentence) => {
        if (typeof sentence === 'string') {
            return sentence.split(/\s+/);
        }
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

    const translateWord = async (word) => {
        try {
            const response = await learningApi.translateText(word);
            setTranslatedWord(response.data.response);
        }
        catch (error) {
            console.error('단어 번역 요청 실패', error);
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

    // 스크랩 
    const createNewsScrap = () => {
        const data = {
            articleOriginId: articleId,
            articleTitle: articleTitle,
            articleContent: articleContent,
            articleLink: articleUrl,
        }

        learningApi.createNewsScrap(data)
            .then((response) => {
                console.log(response);
                setIsNewsScrap(true);
            })
            .catch((error) => {
                console.log("뉴스스크랩 오류 발생");
                console.error(error);
            })
    }

    // 스크랩 삭제
    const deleteNewsScrap = () => {
        learningApi.deleteNewsScrap(articleId)
            .then((response) => {
                console.log(response);
                setIsNewsScrap(false);
            })
            .catch((error) => {
                console.error('스크랩 삭제 오류 발생', error);
            })
    }

    const openModal = () => {
        setIsModalOpen(true);
    }

    const closeModal = () => {
        setIsModalOpen(false)
    }

    const wordModal = (word) => {
        console.log(word);
        setClickWord(word);
        openModal();
    }



    return (
        <div className={styles.container}>

            <img src="../../../assets/NewsArticle/background-img.png" className={styles.backgroundImg}></img>

            <div className={styles.articleTitle}>{articleTitle}</div>
            <div className={styles.articleDate}>{articleDate}</div>
            <button className={styles.listenToSound} onClick={() =>
                speech(articleSentences[currentSentenceIndex])}>
                <img src="../../../assets/NewsArticle/listen-to-sound.png" alt=""></img>
            </button>
            <button className={styles.recordSound}>
                <img src="../../../assets/NewsArticle/record-sound.png"></img>
            </button>
            {!isNewsScrap &&
                <button className={styles.scrap}
                    onClick={createNewsScrap}>
                    <img src="../../../assets/NewsArticle/scrap.png"></img>
                </button>
            }
            {isNewsScrap &&
                <button className={styles.scrap}
                    onClick={deleteNewsScrap}
                >
                    <img src="../../../assets/NewsArticle/scrap_complete.png"></img>
                </button>
            }

            <div className={styles.articleContent}>
                <div className={styles.articleSentences}>
                    <div>
                        {articleSentences[currentSentenceIndex] && splitSentenceIntoWords(articleSentences[currentSentenceIndex]).map((word, index) => {
                            const matchingWord = articleWords.find((highlightWord) =>
                                isWordMatching(word, highlightWord)
                            );

                            const matchingWordLength = matchingWord ? matchingWord.length : 0;
                            return (
                                <span>
                                    <span
                                        key={index}
                                        className={matchingWord
                                            ? styles.highlightWord : ''}
                                        onClick={() => {
                                            if (matchingWord) {
                                                wordModal(matchingWord);
                                                translateWord(matchingWord);
                                            }
                                        }}>{word.substring(0, matchingWordLength)}
                                    </span>{word.substring(matchingWordLength)}{' '}
                                </span>
                            );
                        })}
                    </div>
                    {articleSentences[currentSentenceIndex] && (
                        <div>
                            {translatedSentence}
                        </div>
                    )}
                </div>
            </div>

            <div className={styles.pageMoving}>
                <button onClick={goToPreviousIndex} className={styles.pageButton}>이전</button>
                <p className={styles.pageNumbers}>
                    {currentSentenceIndex + 1} / {articleSentences.length}</p>
                <button onClick={goToNextIndex} className={styles.pageButton}>다음</button>
            </div>

            {
                isModalOpen &&
                <ArticleModal
                    modalProps={{
                        word: clickWord,
                        onCloseModal: closeModal,
                        translatedWord: translatedWord,
                    }}
                ></ArticleModal>
            }

        </div >
    );

}

export default NewsArticle;