import React from 'react';
import News from '../../styles/Learning/Word.module.css';

// const logoStyle = {
//     width: '50%',
// };

function WordLogo(props) {
  return (
    <div className={News.middleContainer}>
        <div className={News.middleTop}>
            <div>
                <div className={News.fontContainer}>
                    <div className={News.topLeftFont}> 해양치유</div>
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
  );
}


export default WordLogo;