import React from 'react';
import './Grid.css';

const Grid = () => {
  const nodes = Array.from({ length: 400 });
  return (
    <div className="grid">
      {nodes.map((val, i) => (
        <div
          key={i}
          style={{
            border: '1px solid black',
          }}
        ></div>
      ))}
    </div>
  );
};

export default Grid;
