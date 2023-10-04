import React from 'react';
import News from '../../styles/Learning/Word.module.css';
import { useNavigate } from "react-router-dom";

function CollectionLogo({logo}) {
  const navigate = useNavigate();
  
  return (
    <div className={News.collectionContainer}>
        <div className={News.leftWrap} onClick={() => navigate(-1)}> {'<'} </div>
        <div className={News.rightWrap}> {logo} </div>
    </div>
  );
}


export default CollectionLogo;