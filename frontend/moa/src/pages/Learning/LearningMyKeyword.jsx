import React, { useState, useEffect } from 'react';
import AppBar from '../../components/AppBar';
import KeywordAdd from '../../components/Learning/KeywordAdd';
import News from '../../styles/Learning/LearningMyKeyword.module.css';
import { Link } from 'react-router-dom';
import { keywordApi } from '../../api/keywordApi';
import { useNavigate } from "react-router-dom";

function LearningKeyword(props) {
  const [words, setWords] = useState([]);
  useEffect(() => {
    keywordApi.getPopularKeywords()
      .then((response) => {
        const res = response.data.response;
        setWords(res);
      })
  }, []);

  const navigate = useNavigate();
  const handleButtonClick = ( keywordName ) => {
    console.log(keywordName)
    navigate('/koreanlearning/word', {
      state: {
        word: keywordName
      }
    })
  };

  return (
    <div >
      <AppBar />
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
        {words.map((command, index) => {
            return (
              <div className={News.container} key={index} onClick={() => handleButtonClick(command.keywordName)}>
                {command.keywordName}
              </div>
            );
          })} 
      </div>
      <Link to="/koreanlearning">
        <button className={News.btn}> 완료 </button>
      </Link>
    </div>
  );
}

export default LearningKeyword;