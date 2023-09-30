import React from "react";

const selectButtonStyle = {
  fontSize: '18px',
  fontWeight: '700',
  border: 'none',
  borderRadius: '80px',
};

function SelectButton({text}){
  return(
    <div>
    {/* GreenBtn */}
      <button style={selectButtonStyle}>{text}</button>
    </div>
  );
};

export default SelectButton;