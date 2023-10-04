import React , { useState, useEffect }from 'react';

function KoreaTourSearch(props) {

  const onChange = (event) => {
    props.setMediaName(event.target.value);
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