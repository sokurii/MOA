import React from 'react';
import News from '../../styles/Learning/word.css';

const logoStyle = {
    width: '50%',
};

function WordLogo(props) {
  return (
    <div className='top-container'>
        <div className='left-wrap'> {'<'} </div>
        <div className='right-wrap'>단어보기</div>
    </div>
  );
}


export default WordLogo;