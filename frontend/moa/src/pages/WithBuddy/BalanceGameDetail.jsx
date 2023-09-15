import React from 'react';
import { useNavigate } from 'react-router';
import { useLocation, Link } from 'react-router-dom';

import BackButton from '../../components/BackButton';

function BalanceGameDetail(props) {
  const location = useLocation();
  const balanceGame = location.state.balanceGame;

  const id = balanceGame.id;
  const title = balanceGame.title;
  const username = balanceGame.username;
  const time = balanceGame.time;
  const balanceGameList = balanceGame.balanceGameList;

  const navigate = useNavigate();

  const handleUpdateBalanceGameClick = () => {
    navigate(`/withbuddy/balancegame/${id}/update`, {
      state: { balanceGame }, // 밸런스게임 데이터를 state에 전달
    });
  };

  return (
    <div>
      <BackButton />
      
      <br />
      {/* 수정 및 삭제 버튼 */}
      <div>
        <button onClick={() => handleUpdateBalanceGameClick()}>수정하기</button>
        <button>삭제하기</button>
      </div>

      { id } 번 밸런스 게임
      <div>
        <h1>제목 : { title }</h1>

        {/* 밸런스 게임 평가 */}
        <div>
          <div>
            😍 : 0
          </div>
          <div>
            😐 : 0
          </div>
          <div>
            😥 : 0
          </div>
        </div>

        {/* 밸런스 게임 정보 */}
        <div>
          제작자 : { username }
        </div>
        <div>
          라운드 수 : { balanceGameList.length }
        </div>
        <div>
          제한시간 : 라운드 당 { time } 초
        </div>
      </div>

      {/* 버디 및 유학생 이름 */}
      <div>
        <div>
          <h5>버디 이름</h5>
        </div>
        <div>
          <h5>유학생 이름</h5>
        </div>
      </div>

      {/* 실시간 채팅 화면 */}
      <div>
        실시간 채팅 영역
        <input type="text" id="liveChat"/>
      </div>

      <hr />

      <button>시작하기</button>

    </div>
  );
}

export default BalanceGameDetail;