import React, { useState } from 'react';

import BackButton from '../../components/Buttons/BackButton';
import KoreaTourSearch from '../../components/KoreaTourSearch';
import KoreaTourMap from '../../components/KoreaTourMap';
import KoreaTourSearchResult from '../../components/KoreaTourSearchResult';

function KoreaTour(props) {
  const [showSearchResults, setShowSearchResults] = useState(false);

  const handleSearchClick = () => {
    setShowSearchResults(true);
  };

  const closeSearchResults = () => {
    setShowSearchResults(false);
  };

  return (
    <div>
      <BackButton />
      <br />
      <h1>한국 둘러보기</h1>
      <hr />
      <div>
        <KoreaTourSearch />
        <button onClick={handleSearchClick}>검색</button>
      </div>
      <hr />
      {showSearchResults && (
        <div className="search-results-popup">
          <KoreaTourMap />
          <KoreaTourSearchResult />
          <button onClick={closeSearchResults}>닫기</button>
        </div>
      )}
    </div>
  );
}

export default KoreaTour;
