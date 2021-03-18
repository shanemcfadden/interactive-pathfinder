import React, { useState } from 'react';
import Node from '../Node/Node';
import './Grid.css';

const Grid = () => {
  const nodes = Array.from({ length: 20 }, () => Array.from({ length: 20 }));
  nodes[5][1] = 'start';
  nodes[5][2] = 'visited';
  nodes[17][19] = 'end';
  const [stateOfNodes, setStateOfNodes] = useState(nodes);
  return (
    <div className="grid">
      {stateOfNodes.map((row, i) => {
        return row.map((val, j) => {
          return <Node currentState={val} key={`${i}-${j}`} />;
        });
      })}
    </div>
  );
};

export default Grid;
