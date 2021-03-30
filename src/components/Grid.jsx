import React, { useRef, useState } from 'react';
import Node from 'components/Node';
import 'styles/Grid.css';
import { TEXTURES_VALUE_NAME_MAP } from 'util/settings';

const Grid = ({
  onClickFunction,
  stateOfNodes,
  setStateOfNodes,
  findingPath,
  stateOfPath,
  currentTexture,
}) => {
  const [currentlyDrawingTextures, setCurrentlyDrawingTextures] = useState(
    false
  );
  const addTexture = (i, j, textureNumber) => {
    const newStateOfNodes = [...stateOfNodes];
    newStateOfNodes[i][j] = textureNumber;
    setStateOfNodes(newStateOfNodes);
  };
  const paths = useRef({
    1: 'visited',
    2: 'path',
    3: 'start',
    4: 'end',
  });

  const createHandleOnMouseDown = (i, j) => {
    return (e) => {
      e.preventDefault();
      setCurrentlyDrawingTextures(true);
      addTexture(i, j, currentTexture);
    };
  };
  const createHandleOnMouseEnter = (i, j) => {
    if (currentlyDrawingTextures) {
      return (e) => {
        e.preventDefault();
        addTexture(i, j, currentTexture);
      };
    }
  };

  const handleOnMouseUp = (e) => {
    e.preventDefault();
    setCurrentlyDrawingTextures(false);
  };

  return (
    <div
      className="grid"
      onMouseLeave={() => {
        setCurrentlyDrawingTextures(false);
      }}
    >
      {stateOfNodes.map((row, i) => {
        return row.map((val, j) => {
          const currentState =
            paths.current[stateOfPath[i][j]] || TEXTURES_VALUE_NAME_MAP[val];
          return (
            <Node
              currentState={currentState}
              handleClick={() => {
                onClickFunction(i, j);
              }}
              handleOnMouseDown={
                currentTexture ? createHandleOnMouseDown(i, j) : undefined
              }
              handleOnMouseEnter={
                currentTexture ? createHandleOnMouseEnter(i, j) : undefined
              }
              handleOnMouseUp={currentTexture ? handleOnMouseUp : undefined}
              key={`${i}-${j}`}
              findingPath={findingPath}
            />
          );
        });
      })}
    </div>
  );
};

export default Grid;
