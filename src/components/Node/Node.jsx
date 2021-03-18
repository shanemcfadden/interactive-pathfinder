import React from 'react';
import './Node.css';

const Node = ({ currentState, row, column, handleClick }) => {
  return (
    <div
      className={`node${currentState ? ` node--${currentState}` : ''}`}
      onClick={handleClick}
    ></div>
  );
};

export default Node;
