import React, { useState } from 'react';
import News from '../../styles/Learning/Word.module.css';
import KeywordModal from '../../components/Learning/KeywordModal';

function WordLogo(props) {
    const { word } = props;
    const [isModalOpen, setModalOpen] = useState(false);

    // 모달 열기 함수
    const openModal = () => {
      setModalOpen(true);
    };
  
    // 모달 닫기 함수
    const closeModal = () => {
      setModalOpen(false);
    };


    return (
        <div className={News.middleContainer}>
            <div className={News.wrapContainer}>
                <div className={News.middleTop}>
                    <div>
                        <div className={News.fontContainer}>
                            <div className={News.topLeftFont}> { word.word } </div>
                            <div className={News.topRightFont}>  &nbsp; marine therapy</div> <br />
                        </div>
                        <div className={News.topLeftFont}>[Yeshi dan-eo]</div>
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