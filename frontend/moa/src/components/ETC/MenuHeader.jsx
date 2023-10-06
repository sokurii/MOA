import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "../../styles/EtcComponent/MenuHeader.module.css"

function MenuHeader({title}){
  const navigate = useNavigate();
  const handleGoBack = () => {
    navigate(-1);
  };
  return(
    <div className={styles.header}>
      <div className={styles.headerContainer}>
        <div onClick={handleGoBack}>
          <img src={process.env.PUBLIC_URL + '/assets/etcComponent/backBtn.png'} alt="뒤로가기" /> 
        </div>
        <span className={styles.headerText}>{title}</span>
      </div>
    </div>
  );
};

export default MenuHeader;