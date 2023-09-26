import React from 'react';
import KeywordItem from '../../components/Learning/KeywordItem';
import WordCloud from '../../components/Learning/WordCloud';
import PopularWords from '../../components/Learning/PopularWords';
import Logo from '../../components/Logo';
import '../../styles/Learning/news.css';
import { Link } from 'react-router-dom';

function KoreanLearning(props) {
  return (
    <div >
      <Logo />  
      <div className='display'>
        <div className='font'> View words about...</div>
        <Link to="/koreanlearning/keyword">
          <img src="../../../assets/news/modifyKeyword.png"  style={{ width: '20px'}}></img>
        </Link>
      </div>
      <KeywordItem />
      <div className='display'>
        <div className='font'>Trending Words Now!</div>
      </div>
      <WordCloud /> 
      <div className='display'>
        <div className='font'>Most Popular Word</div>
      </div>
      <PopularWords />
    </div>
  );
}

export default KoreanLearning;