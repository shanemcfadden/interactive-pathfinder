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
  const wallsAllowed = (currentState, drawingWallsAllowed) => {
    return (
      currentState !== 'start' && currentState !== 'end' && drawingWallsAllowed
    );
  };
  return (
    <div
      className={`node${currentState ? ` node--${currentState}` : ''}`}
      onClick={handleClick}
      onMouseDown={
        wallsAllowed(currentState, drawingWallsAllowed)
          ? handleOnMouseDown
          : undefined
      }
      onMouseEnter={
        wallsAllowed(currentState, drawingWallsAllowed) && currentlyDrawingWalls
          ? handleOnMouseEnter
          : undefined
      }
      onMouseUp={
        wallsAllowed(currentState, drawingWallsAllowed)
          ? handleOnMouseUp
          : undefined
      }
    ></div>
  );
};

export default Node;
