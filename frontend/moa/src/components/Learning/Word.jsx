import React, { useState, useEffect } from 'react';
import News from '../../styles/Learning/Word.module.css';
import KeywordModal from '../../components/Learning/KeywordModal';
import { learningApi } from '../../api/learningApi';

function WordLogo(props) {
    const { word } = props;
    const [isModalOpen, setModalOpen] = useState(false);
    const [translatedSentence, setTranslatedSentence] = useState('');

    // 모달 열기 함수
    const openModal = () => {
      setModalOpen(true);
    };
  
    // 모달 닫기 함수
    const closeModal = () => {
      setModalOpen(false);
    };

    useEffect(() => {
        learningApi.translateText(word.word)
          .then((response) => {
            const res = response.data.response;
            setTranslatedSentence(res);
          })
    }, []);

    return (
        <div className={News.middleContainer}>
            <div className={News.wrapContainer}>
                <div className={News.middleTop}>
                    <div>
                        <div className={News.fontContainer}>
                            <div className={News.topLeftFont}> { word.word } </div>
                            <div className={News.topRightFont}>  &nbsp; {translatedSentence}</div> <br />
                        </div>
                        {/* <div className={News.topLeftFont}>[Yeshi dan-eo]</div> */}
                    </div>
                    <button className={News.soundContainer}>
                        <img className={News.soundImg} src="../../../assets/news/volumeHigh.png" alt=""></img>
                    </button>
                </div>
                <button className={News.askButton}
                    onClick={openModal}>
                    <div className={News.askFont}>Ask to AI</div>
                </button>
            </div>
        </div>
    );
}


export default WordLogo;