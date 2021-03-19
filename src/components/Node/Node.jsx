import React from 'react';
import './Node.css';

const Node = ({
  currentState,
  handleClick,
  handleOnMouseDown,
  handleOnMouseEnter,
  handleOnMouseUp,
}) => {
  return (
    <div
      className={`node${currentState ? ` node--${currentState}` : ''}`}
      onClick={handleClick}
      onMouseDown={handleOnMouseDown}
      onMouseEnter={handleOnMouseEnter}
      onMouseUp={handleOnMouseUp}
    ></div>
  );
};

export default Node;
