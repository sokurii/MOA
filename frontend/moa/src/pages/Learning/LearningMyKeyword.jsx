import React from 'react';
import Logo from '../../components/Logo';
import KeywordAdd from '../../components/Learning/KeywordAdd';
import News from '../../styles/Learning/LearningMyKeyword.module.css';
import { Link } from 'react-router-dom';

function LearningKeyword(props) {
  return (
    <div >
      <Logo />
      <div className={News.display}>
        <div className={News.font}> 관심 키워드 </div>
      </div>
      <div className={News.middleFont}> 관심 있는 키워드를 등록하고 관련 이슈를 확인하세요! </div>
      <KeywordAdd />
      <button className={News.keywordBtn}> 키워드 추가하기 </button>
      <div className={News.display}>
        <div className={News.font}> 추천 키워드 </div>
      </div>
      <div className={News.middleFont}> 모아에서 추천하는 사용자 검색 기반 키워드입니다 </div>
      <div>
        <div className={News.container}>노르딕워킹</div>
        <div className={News.container}>장하오</div>
        <div className={News.container}>락페스티벌</div>
      </div>
      <Link to="/koreanlearning">
        <button className={News.btn}> 완료 </button>
      </Link>
    </div>
  );
}

export default LearningKeyword;