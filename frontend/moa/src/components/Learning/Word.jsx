import React from 'react';
import News from '../../styles/Learning/Word.module.css';


function WordLogo(props) {
    const { word } = props;
    console.log(word);

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
                <button className={News.askButton}>
                    <div className={News.askFont}>Ask to AI</div>
                </button>
            </div>
        </div>
    );
}


export default WordLogo;