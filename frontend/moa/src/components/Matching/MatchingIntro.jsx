import React from 'react';
import store from '../../store';

const state = store.getState();

const introStyle = {
  display: 'flex',
  flexDirection: 'column',
  padding: '10px 30px',
};

const introCommentStyle = {
  textAlign: 'left',
  fontSize: '24px',
  fontWeight: '700',
};

const imageContainerStyle = {

};

const imageStyle = {

};

function MatchingIntro(props) {
  const isForeigner = state.isForeigner;
  
  return (
    <div style={introStyle}>
      <div style={introCommentStyle}>
        {isForeigner ? (
          <span>
            반가워요!
            <br />
            멋진 한국인 친구,
            <br />
            버디를 만나보세요
          </span>
        ) : (
          <span>
            한국을 좋아하는
            <br />
            외국인 친구를
            <br />
            만나보세요!
          </span>
        )}
      </div>
      <div style={imageContainerStyle}>
        <img src={process.env.PUBLIC_URL + '/assets/Matching/Intro.png'} alt="사진" />
      </div>
    </div>
  );
}

export default MatchingIntro;