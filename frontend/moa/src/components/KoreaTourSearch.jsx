import React from 'react';

function KoreaTourSearch(props) {
  return (
    <div>
      <h3>검색</h3>
      <div>
        <label htmlFor="mediaType">매체 분류</label>
        <input type="text" id="mediaType" />
      </div>
      <div>
        <label htmlFor="title">이름</label>
        <input type="text" id="title" />
      </div>
      <div>
        <label htmlFor="place">장소</label>
        <input type="text" id="place" />
      </div>
      <div>
        <label htmlFor="placeType">장소 분류</label>
        <input type="text" id="placeType" />
      </div>
    </div>
  );
}

export default KoreaTourSearch;