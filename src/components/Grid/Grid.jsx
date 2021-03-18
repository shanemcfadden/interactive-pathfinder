import React from 'react';
import Node from '../Node/Node';
import './Grid.css';

const Grid = () => {
  const nodes = Array.from({ length: 400 });
  return (
    <div className="grid">
      {nodes.map((val, i) => (
        <Node key={i} />
      ))}
    </div>
  );
};

export default Grid;
