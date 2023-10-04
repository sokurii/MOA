import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import AppBar from '../../../components/ETC/AppBar';
import { koreaTourApi } from "../../../api/KoreaTourApi";
import styles from '../../../styles/KoreaTour/KoreaTourSearch.module.css';

function KoreaTour(props) {
  const [mediaPlaceList, setMediaPlaceList] = useState([]);
  const [mediaName, setMediaName] = useState("");

  const navigate = useNavigate();

  const onChange = (event) => {
    setMediaName(event.target.value);
    console.log(event.target.value);
    koreaTourApi.getAutoComplete(event.target.value).then((response) => {
      // setMediaPlaceList(response.data.response);
      console.log(response.data.response);
    });
  }

  const handleSearchClick = () => {
    const type = "all";
    koreaTourApi.getMediaList(type, mediaName).then((response) => {
      setMediaPlaceList(response.data.response);
      console.log(response.data.response);
    });
  };

  useEffect(() => {
    if (mediaPlaceList.length > 0) {
      navigate(`/buddy/koreatour/${mediaName}`, {
        state: {
          mediaPlaceList: mediaPlaceList,
          mediaName: mediaName
        },
        
        });
    }
  }, [mediaPlaceList]);

  return (
    <div className={styles.container}>
      <div className={styles.inner}>
        <AppBar></AppBar>
        <div className={styles.searchContainer}>
          <div className={styles.searchContents}>
            <div className={styles.searchLabel}>
              <label htmlFor="mediaName">검색어를 입력하세요</label>
            </div>
            <div className={styles.searchArea}>
              <div className={styles.searchInput}>
                <span className={styles.vector}></span>
                <input className={styles.input} type="text" id="mediaName" onChange={onChange} placeholder="K-DRAMA or K-POP" />
              </div>
              <button className={styles.searchBtn} onClick={handleSearchClick}>검색하기</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default KoreaTour;
