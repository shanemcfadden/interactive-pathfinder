import React from 'react';
import Node from '../Node/Node';
import './Grid.css';

const Grid = () => {
  const nodes = Array.from({ length: 400 });
  nodes[203] = 'start';
  nodes[204] = 'visited';
  nodes[179] = 'end';
  return (
    <div className="grid">
      {nodes.map((val, i) => (
        <Node currentState={val} key={i} />
      ))}
    </div>
  );
};

export default Grid;
