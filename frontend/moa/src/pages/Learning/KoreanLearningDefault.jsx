import React from 'react';
import Logo from '../../components/Logo';
import Default from '../../styles/Learning/KoreanLearningDefault.module.css';

import { Link } from 'react-router-dom';

function KoreanLearningDefault(props) {
  return (
    <div>
      <Logo />
      <div className={Default.font}> View words about...</div>
      <div className={Default.container}>
        <img src="../../../assets/news/default.png" alt="default logo" style={{ width: '330px', height: '387px', marginTop: '10%' }}/>
        <Link to="/koreanlearning/keyword">
          <button className={Default.btn}>키워드 등록하기</button>
        </Link>
      </div>

    </div>
  );
}

export default KoreanLearningDefault;