import React from 'react';
import Logo from '../../components/Logo';
import News from '../../styles/Learning/news.css';
import Default from '../../assets/news/default.png';
import { Link } from 'react-router-dom';

function KoreanLearning(props) {
  return (
    <div>
      <Logo />
      <div className='display'>
        <div className='font'> View words about...</div>
      </div>
      <div className='wrap-container'>
        <img src={Default} alt="default logo" style={{ width: '330px', height: '387px', marginTop: '10%' }}/>
        <Link to="/koreanlearning/keyword">
          <button className='btn'>키워드 등록하기</button>
        </Link>
      </div>
    </div>
  );
}

export default KoreanLearning;