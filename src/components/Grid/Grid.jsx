import React from 'react';
import Node from '../Node/Node';
import './Grid.css';

const Grid = () => {
  const nodes = Array.from({ length: 20 }, () => Array.from({ length: 20 }));
  nodes[5][1] = 'start';
  nodes[5][2] = 'visited';
  nodes[17][19] = 'end';
  return (
    <div className="grid">
      {nodes.map((row, i) => {
        return row.map((val, j) => {
          return <Node currentState={val} key={`${i}-${j}`} />;
        });
      })}
    </div>
  );
};

export default Grid;
