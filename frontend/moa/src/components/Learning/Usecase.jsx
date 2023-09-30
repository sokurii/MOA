import React from 'react';
import UseCase from '../../styles/Learning/Usecase.module.css';

function Usecase(props) {
  
  return (
    <div>
      <div className={UseCase.usecaseContainer}>
        <div className={UseCase.firstFont}>바닷속에서 파도 소리를 듣는 것은 나를 진정시키고 해양 치유의 효과를 느끼게 해줍니다.</div>
        <div className={UseCase.secondFont}>Listening to waves in the sea calms me down and makes me feel the effects of ocean healing. </div>
      </div>
      <div className={UseCase.usecaseContainer}>
        <div className={UseCase.firstFont}>바닷속에서 파도 소리를 듣는 것은 나를 진정시키고 해양 치유의 효과를 느끼게 해줍니다.</div>
        <div className={UseCase.secondFont}>Listening to waves in the sea calms me down and makes me feel the effects of ocean healing. </div>
      </div>
    </div>
    
  );
}

export default Usecase;