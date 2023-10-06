import React, { useState } from "react";
import { useLocation, useNavigate  } from 'react-router-dom';
import KoreaTourMap from "../../../components/KoreaTour/KoreaTourMap";
import styles from '../../../styles/KoreaTour/KoreaTourResult.module.css';

function KoreaTourResult() {
    const location = useLocation(); 
    const navigate = useNavigate();

    
    const handleBackClick = (e) => {
        navigate(-1)
    }

  return (
      <div className={styles.container}>
          <div className={styles.header}>
              <div className={styles.headerTop}>
                  <span className={styles.back} onClick={(e) => handleBackClick(e)}></span>
                  <span className={styles.title}>한국 둘러보기</span>
              </div>
          </div>
        <div className={styles.main}>
          <KoreaTourMap mediaName={location.state.mediaName} mediaPlaceList={location.state.mediaPlaceList} />
        </div>
    </div>
  );
}

export default KoreaTourResult;
