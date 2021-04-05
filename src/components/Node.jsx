import React from 'react';
import 'styles/Node.css';

const Node = ({
  currentState,
  handleClick,
  handleOnMouseDown,
  handleOnMouseEnter,
  handleOnMouseUp,
  findingPath,
  visited,
}) => {
  return (
    <div
      className={`node node--${currentState}${
        findingPath ? ' node--animated' : ''
      }${visited ? ' node--visited' : ''}`}
      onClick={handleClick}
      onMouseDown={handleOnMouseDown}
      onMouseEnter={handleOnMouseEnter}
      onMouseUp={handleOnMouseUp}
    ></div>
  );
};

export default Node;
