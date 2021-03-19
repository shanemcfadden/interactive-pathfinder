import React from 'react';
import './Node.css';

const Node = ({
  currentState,
  handleClick,
  handleOnMouseDown,
  handleOnMouseEnter,
  handleOnMouseUp,
  drawingWallsAllowed,
  currentlyDrawingWalls,
}) => {
  return (
    <div
      className={`node${currentState ? ` node--${currentState}` : ''}`}
      onClick={handleClick}
      onMouseDown={drawingWallsAllowed ? handleOnMouseDown : undefined}
      onMouseEnter={
        drawingWallsAllowed && currentlyDrawingWalls
          ? handleOnMouseEnter
          : undefined
      }
      onMouseUp={drawingWallsAllowed ? handleOnMouseUp : undefined}
    ></div>
  );
};

export default Node;
