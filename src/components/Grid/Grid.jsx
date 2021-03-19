import React from 'react';
import Node from '../Node/Node';
import './Grid.css';

const Grid = ({ startNode, endNode, onClickFunction, visitedNodes }) => {
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
            currentState = val;
          }
          return (
            <Node
              currentState={currentState}
              row={i}
              column={j}
              handleClick={() => {
                onClickFunction(i, j);
              }}
              key={`${i}-${j}`}
            />
          );
        });
      })}
    </div>
  );
};

export default Grid;
