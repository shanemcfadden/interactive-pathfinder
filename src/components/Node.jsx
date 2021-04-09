import React from 'react';
import 'styles/Node.css';

const Node = ({
  currentTexture,
  currentPathState,
  handleClick,
  handleOnMouseDown,
  handleOnMouseEnter,
  handleOnMouseUp,
  findingPath,
}) => {
  return (
    <div
      className={`node node--${currentTexture}${
        currentPathState ? ` node--${currentPathState}` : ''
      }`}
      onClick={handleClick}
      onMouseDown={handleOnMouseDown}
      onMouseEnter={handleOnMouseEnter}
      onMouseUp={handleOnMouseUp}
    ></div>
  );
};

export default Node;
