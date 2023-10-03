import React from 'react';
import { useNavigate } from "react-router-dom";

const backButtonStyle = {
  backgroundColor: 'transparent',
  border: 'none',
  fontSize: '24px',
  fontWeight: '700',
};

function BackButton({ text = '뒤로가기' }) {
  const navigate = useNavigate();

  return (
    <div>
      <div onClick={() => navigate(-1)}>
        <button style={backButtonStyle}>{text}</button>
      </div>
    </div>
  );
}

export default BackButton;