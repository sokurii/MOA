import React from "react";

const selectButtonStyle = {
  fontSize: '18px',
  fontWeight: '700',
  width: '100%',
  border: 'none',
  borderRadius: '80px',
  margin: '10px 5px',
  padding: '10px 0',
  boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
};

function SelectButton({ text, selected, onClick }){
  const buttonStyle = {
    ...selectButtonStyle,
    background: selected ? 'linear-gradient(104deg, #C4DD7C 0%, #A6CC38 100%)' : 'white',
    color: selected ? 'white' : '#92BB69',
  }
  return(
    <div>
    {/* GreenBtn */}
      <button style={buttonStyle} onClick={onClick}>{text}</button>
    </div>
  );
};

export default SelectButton;