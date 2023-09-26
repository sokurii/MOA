import React from 'react';
import News from '../../styles/Learning/news.css';
import WordLogo from '../../components/Learning/WordLogo';
import Word from '../../components/Learning/Word';
import Usecase from '../../components/Learning/Usecase';
import RelatedNews from '../../components/Learning/RelatedNews';
// import { Link } from 'react-router-dom';

function WordLearning(props) {
  return (
    <div >
        <WordLogo />
        <div className='display'>
          <div className='font'> Word </div>
        </div>
        <Word />
        <div className='display'>
          <div className='font'> Usecases </div>
        </div>
        <Usecase />
        <div className='display-plus'>
          <div className='display-plus font'> Related News </div>
          <div className='display-plus plus-font'>더보기</div>
        </div>
        <RelatedNews />
    </div>
  );
}

export default WordLearning;