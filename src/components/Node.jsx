import React from 'react';
import 'styles/Node.css';

const Node = ({
  currentTexture,
  currentPathState,
  handleClick,
  handleOnMouseDown,
  handleOnMouseEnter,
  handleOnMouseUp,
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
    >
      {currentPathState === 'start' && 'S'}
      {currentPathState === 'end' && 'E'}
    </div>
  );
};

export default Node;
