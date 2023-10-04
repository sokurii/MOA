import React, { useState, useEffect } from 'react';
// import AppBar from '../../components/ETC/AppBar';
import MenuHeader from '../../components/ETC/MenuHeader'
import KeywordAdd from '../../components/Learning/KeywordAdd';
import News from '../../styles/Learning/LearningMyKeyword.module.css';
import Swal from "sweetalert2";

import { Link } from 'react-router-dom';
import { keywordApi } from '../../api/keywordApi';
import { useNavigate } from "react-router-dom";

function LearningKeyword(props) {

  const [words, setWords] = useState([]);
  const [keywords, setKeyords] = useState([]);
  const [addKeyword, setAddKeyword] = useState('');

  useEffect(() => {
    keywordApi.getPopularKeywords()
      .then((response) => {
        const res = response.data.response;
        setWords(res);
      })
  }, []);

  useEffect(() => {
    keywordApi.getKeywords()
      .then((response) => {
        const res = response.data.response;
        setKeyords(res);
        console.log(res);
      })
      .catch((error) => {
        console.error("키워드 조회 오류 발생 " + error);
      })
  }, [])

  const navigate = useNavigate();
  const handleButtonClick = (keywordName) => {
    console.log(keywordName)
    navigate('/koreanlearning/word', {
      state: {
        word: keywordName
      }
    })
  };

  const handleKeywordInputChange = (e) => {
    setAddKeyword(e.target.value);
  }

  const createKeyword = () => {
    const data = [{
      keywordName: addKeyword
    }]

    keywordApi.saveKeywords(data)
      .then((response) => {
        console.log(response);
        Swal.fire({
          icon: 'success',
          text: '키워드가 등록되었어요!',
          confirmButtonColor: '#CBDCFD',
        })
        window.location.reload();
      })
      .catch((error) => {
        console.error("키워드 등록 오류 발생 : " + error);
      })
  }

  return (
    <div >
      <MenuHeader title="키워드 등록" />
      <div className={News.display}>
        <div className={News.font}> 관심 키워드 </div>
      </div>
      <div className={News.middleFont}> 관심 있는 키워드를 등록하고 관련 이슈를 확인하세요! </div>

      {keywords.map((keyword, index) => (
        <KeywordAdd key={index} keyword={keyword} />
      ))}

      <div>
        <label htmlFor='keywordInput'></label>
        <input
          id='keywordInput'
          className={News.keywordInput}
          value={addKeyword}
          onChange={handleKeywordInputChange}>
        </input>
      </div>


      <button className={News.keywordBtn}
        onClick={createKeyword}> 키워드 추가하기 </button>
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