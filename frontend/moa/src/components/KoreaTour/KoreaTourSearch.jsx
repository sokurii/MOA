import React , { useState, useEffect }from 'react';
import { koreaTourApi } from "../../api/KoreaTourApi";
function KoreaTourSearch(props) {

  const onChange = (event) => {
    props.setMediaName(event.target.value);
    console.log(event.target.value);
    koreaTourApi.getAutoComplete(event.target.value).then((response) => {
      // setMediaPlaceList(response.data.response);
      console.log(response.data.response);
    });

  }

  return (
    <div>
      <h3>검색</h3>
      <div>
        <label htmlFor="mediaName">검색어를 입력하세요</label>
        <input type="text" id="mediaName" onChange ={onChange} placeholder="K-DRAMA or K-POP"/>
      </div>
    </div>
  );
}

export default KoreaTourSearch;