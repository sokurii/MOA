import React from 'react';

const levelTableStyle = {
  width: '100%',
};

function LevelTable({ levelId }) {
  const tableBodyStyle = {
    borderRadius: '10px',
  };

  const tableData = [
    [' ', 'Lv.1', 'Lv.2', 'Lv.3', 'Lv.4', 'Lv.5', 'Lv.6'],
    ['건', '1', '2', '3', null, null, null],
    ['곤', '4', '5', '6', '7', null, null],
    ['감', '8', '9', '10', '11', '12', null],
    ['리', '13', '14', '15', '16', '17', '18'],
    ['태극', '19', null, null, null, null, null],
  ];

  return (
    <div>
      <table style={levelTableStyle}>
        <thead>
          <tr>
            {tableData[0].map((header, colIndex) => (
              <th key={colIndex}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {tableData.slice(1).map((row, rowIndex) => (
            <tr key={rowIndex}>
              <th>{row[0]}</th>
              {row.slice(1).map((cell, colIndex) => (
                <td key={colIndex}>
                  {cell === null? null :
                    <div style={{
                      ...tableBodyStyle,
                      border: cell === levelId ? '1px solid black' : 'none',
                    }}>
                      <img src={process.env.PUBLIC_URL + `/assets/level/Lv${cell}.png`} alt="레벨" />
                    </div>
                  }
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default LevelTable;