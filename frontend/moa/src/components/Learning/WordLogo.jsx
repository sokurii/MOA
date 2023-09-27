import React from 'react';
import News from '../../styles/Learning/Word.module.css';

const logoStyle = {
    width: '50%',
};

function WordLogo(props) {
  return (
    <div className={News.topContainer}>
        <div className={News.leftWrap}> {'<'} </div>
        <div className={News.rightWrap}>단어보기</div>
    </div>
  );
}


export default WordLogo;