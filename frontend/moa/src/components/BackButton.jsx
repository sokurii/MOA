import React from 'react';
import { useNavigate } from "react-router-dom";

function BackButton(props) {
  const navigate = useNavigate();

  return (
    <div>
      <div onClick={() => navigate(-1)}>
        <button>뒤로가기</button>
      </div>
    </div>
  );
}

export default BackButton;