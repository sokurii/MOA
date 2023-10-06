import React from "react";
import CreatePost from "../../components/QnA/CreatePost";

function QnABoard(){
  return(
    <>
      <h3>질문/교정 페이지</h3>
      <p>어려운 한국 표현을 물어보세요</p>
      <hr />
      <buttom>글 작성하기</buttom>
      <CreatePost />

    </>
  );
}

export default QnABoard;