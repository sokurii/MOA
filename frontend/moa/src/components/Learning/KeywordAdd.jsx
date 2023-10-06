import React from 'react';
import News from '../../styles/Learning/KeywordAdd.module.css';
import Swal from "sweetalert2";
import { keywordApi } from '../../api/keywordApi';

function KeywordItem(props) {

  const { keyword } = props;

  const deleteKeyword = () => {
    keywordApi.deleteKeyword(keyword.keywordId)
      .then((response) => {
        console.log(response);
        Swal.fire({
          icon: 'success',
          text: '키워드가 삭제되었어요!',
          confirmButtonColor: '#CBDCFD',
        })
        window.location.reload()
      })
      .catch((error) => {
        console.error("키워드 삭제 오류 " + error);
      })
  }

  return (
    <div className={News.displayMiddle}>
      <div className={News.container}>
        <span className={News.keywordName}>{keyword.keywordName}</span>
        <button className={News.deleteBtn}
          onClick={deleteKeyword}>X</button>
      </div>
    </div>
  );
}

export default KeywordItem;