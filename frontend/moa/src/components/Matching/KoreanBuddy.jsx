import React, { useState, useEffect } from "react";

const koreanBuddyStyle = {
  display: 'flex',
  flexDirection: 'column',
  padding: '10px 30px',
};

const introCommentStyle = {
  textAlign: 'left',
  fontSize: '24px',
  fontWeight: '700',
  marginBottom: '180px',
};

const selectOptionContainerStyle = {
  textAlign: 'left',
  fontSize: '28px',
  marginBottom: '220px',
};

const selectBoxStyle = {
  background: 'transparent',
  fontSize: '18px',
  fontWeight: '500',
  borderBottom: '1px solid #92BB69', // 밑줄 스타일
  borderLeft: 'none',
  borderRight: 'none',
  borderTop: 'none',
  // margin: '10px auto',
  height: '30px',
};

const topCommentStyle = {
  display: 'flex',
  alignItems: 'center',
};

function KoreanBuddy(props) {
  const [selected, setSelected] = useState("71");

  const handleSelect = (e) => {
    setSelected(e.target.value);
  };

  useEffect(() => {
    props.setSelectedNation(selected);
  }, [selected]);

  return(
    <div style={koreanBuddyStyle}>
      <div style={introCommentStyle}>
        <span>
          버디에게 묻는다...
          <br />
          니 어데서 왔노...
        </span>
      </div>
      <div style={selectOptionContainerStyle}>
        <div style={topCommentStyle}>
          <select style={selectBoxStyle} onChange={handleSelect} value={selected}>
            <option value="71">미국</option>
            <option value="177">일본</option>
            <option value="183">중국</option>
            <option value="155">영국</option>
          </select>
          <span>에서 온</span>
        </div>
        <div>
          <span>버디를 만나볼래요!</span>
        </div>
      </div>
    </div>
  );
};

export default KoreanBuddy;