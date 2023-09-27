import React from 'react';

const learningHomeStyle = {
  padding: '30px',
  backgroundImage: `
    url(${process.env.PUBLIC_URL}/assets/Background/news_background.png)
  `,
  backgroundSize: 'cover', // 배경 이미지 크기 조절
  backgroundRepeat: 'no-repeat', // 배경 이미지 반복 없음
  backgroundPosition: 'center', // 배경 이미지 중앙 정렬
};

const newsButtonStyle = {
  background: 'linear-gradient(180deg, #E9F6FF 17%, #8EB0E3 77%)',
  borderRadius: '18px',
  margin: '40px auto',
  padding: '40px',
  boxShadow: '0px 10px 6px rgba(0, 0, 0, 0.1)',
};

const buttonTitleStyle = {
  display: 'flex',
  color: '#284657',
  fontSize: '24px',
  fontWeight: '700',
};

const buttonContentStyle = {
  display: 'flex',
  textAlign: 'left',
  color: '#284657',
  fontSize: '18px',
  fontWeight: '700',
};

const collectionButtonStyle = {
  padding: '40px',
  background: 'linear-gradient(180deg, #E9F6FF 17%, #8EB0E3 77%)',
  borderRadius: '18px',
  margin: '40px auto',
  padding: '40px',
  boxShadow: '0px 10px 6px rgba(0, 0, 0, 0.1)',
};

function LearningHome(props) {
  return (
    <div style={learningHomeStyle}>
      <div className="news-button" style={newsButtonStyle}>
        <p style={buttonTitleStyle}>뉴스보기</p>
        <p style={buttonContentStyle}>
          원하는 키워드 트렌드를 확인하고
          <br />
          그와 관련된 뉴스를 읽어보세요
        </p>
      </div>
      <div className="collection-button" style={collectionButtonStyle}>
        <p style={buttonTitleStyle}>Collection</p>
        <p style={buttonContentStyle}>설명</p>
      </div>
    </div>
  );
}

export default LearningHome;