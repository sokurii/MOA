import React from 'react';
import News from '../../styles/Learning/Word.module.css';
import { useNavigate } from "react-router-dom";

const logoStyle = {
    width: '50%',
};

function WordLogo(props) {
  const { word } = props;
  const navigate = useNavigate();
  
  return (
    <div className={News.topContainer}>
        <div className={News.leftWrap} onClick={() => navigate(-1)}> {'<'} </div>
        <div className={News.rightWrap}> {word}보기</div>
    </div>
  );
}


export default WordLogo;