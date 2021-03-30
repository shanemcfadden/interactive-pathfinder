import React from 'react';
import 'styles/Node.css';

const Node = ({
  currentState,
  handleClick,
  handleOnMouseDown,
  handleOnMouseEnter,
  handleOnMouseUp,
  findingPath,
}) => {
  return (
    <div
      className={`node node--${currentState}${
        findingPath ? ' node--animated' : ''
      }`}
      onClick={handleClick}
      onMouseDown={handleOnMouseDown}
      onMouseEnter={handleOnMouseEnter}
      onMouseUp={handleOnMouseUp}
    ></div>
  );
};

export default Node;
