import React from 'react';
import './Node.css';

const Node = ({ currentState }) => {
  return (
    <div
      className={`node${currentState ? ` node--${currentState}` : ''}`}
    ></div>
  );
};

export default Node;
