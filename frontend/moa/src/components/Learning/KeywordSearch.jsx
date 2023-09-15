import React from 'react';

function KeywordSearch(props) {
  return (
    <div>
      <h3>키워드 검색</h3>
      <div>
        <label htmlFor="searchInput">검색 | </label>
        <input type="text" id="searchInput" />
      </div>

    </div>
  );
}

export default KeywordSearch;