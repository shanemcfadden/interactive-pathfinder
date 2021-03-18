import React, { useState } from 'react';
import Node from '../Node/Node';
import './Grid.css';

const Grid = () => {
  const nodes = Array.from({ length: 20 }, () => Array.from({ length: 20 }));
  nodes[5][2] = true;
  const [visitedNodes, setVisitedNodes] = useState(nodes);
  const [startNode, setStartNode] = useState([5, 1]);
  const [endNode, setEndNode] = useState([17, 19]);

  const handleNodeClick = (i, j) => {
    return (e) => {
      e.preventDefault();
      setStartNode([i, j]);
    };
  };

  return (
    <div className="grid">
      {visitedNodes.map((row, i) => {
        return row.map((val, j) => {
          let currentState;
          if (i === startNode[0] && j === startNode[1]) {
            currentState = 'start';
          } else if (i === endNode[0] && j === endNode[1]) {
            currentState = 'end';
          } else {
            currentState = val ? 'visited' : undefined;
          }
          return (
            <Node
              currentState={currentState}
              row={i}
              column={j}
              handleClick={handleNodeClick(i, j)}
              key={`${i}-${j}`}
            />
          );
        });
      })}
    </div>
  );
};

export default Grid;
