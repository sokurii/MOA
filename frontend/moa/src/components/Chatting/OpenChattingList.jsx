import React, { useState, useEffect } from 'react';
import { openChatApi } from '../../api/chatApi';

import OpenChattingListItem from './OpenChattingListItem';

function OpenChattingList(props) {
  const [openChattings, setOpenChattings] = useState([]);

  useEffect(() => {
    openChatApi.getOpenChatRoom()
      .then((response) => {
        const res = response.data.response;
        setOpenChattings(res);
      })
      .catch((error) => {
        console.log('오픈채팅방 전체 조회 오류');
        console.log(error);
      });
  }, []);

  return (
    <div>
      {openChattings.length === 0 ? (
        <p>생성된 오픈채팅방이 없습니다.</p>
      ) : (
        openChattings.map((openChatting, index) => {
          const openChatId = openChatting.openChatId;

          return (
            <div key={index}>
              <OpenChattingListItem openChatId={openChatId} />
            </div>
          );
        })
      )}
    </div>
  );
}

export default OpenChattingList;