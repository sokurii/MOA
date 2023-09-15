import React from 'react';

import BackButton from '../../components/BackButton';

function CreateExchangeDiary(props) {
  return (
    <div>
      <BackButton />
      <h1>교환일기 작성</h1>
      <div>
        <p>사진 업로드 Component</p>
      </div>
      <div>
        <label htmlFor="title">제목</label>
        <input type="text" id="title" />
      </div>
      <div>
        <label htmlFor="content">내용</label>
        <input type="text" id="content" />
      </div>
      <hr />
      <button>생성하기</button>
    </div>
  );
}

export default CreateExchangeDiary;