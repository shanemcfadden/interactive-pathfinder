import '../styles/Node.css';
import type { Texture } from '../settings/textures';
import { Path, type PathValue } from '../settings/paths';
import type { MouseEventHandler } from 'react';

const Node = ({
  currentTexture,
  isStart,
  isEnd,
  currentPathState,
  handleClick,
  handleOnMouseDown,
  handleOnMouseEnter,
  handleOnMouseUp,
}: {
  currentTexture: Texture;
  isStart: boolean;
  isEnd: boolean;
  currentPathState: PathValue;
  handleClick: () => void;
  handleOnMouseDown: MouseEventHandler;
  handleOnMouseEnter: MouseEventHandler;
  handleOnMouseUp: MouseEventHandler;
}) => {
  return (
    <div
      className={`node node--${currentTexture} ${getPathStateClass({
        isStart,
        isEnd,
        path: currentPathState,
      })}`}
      onClick={handleClick}
      onMouseDown={handleOnMouseDown}
      onMouseEnter={handleOnMouseEnter}
      onMouseUp={handleOnMouseUp}
    >
      {isStart && 'S'}
      {isEnd && 'E'}
    </div>
  );
};

export default Node;

const getPathStateClass = ({
  isStart,
  isEnd,
  path,
}: {
  isStart: boolean;
  isEnd: boolean;
  path: PathValue;
}): string => {
  if (isStart) {
    return 'node--start';
  }

  if (isEnd) {
    return 'node--end';
  }

  return PATH_VALUE_TO_CLASS_MAP[path];
};

const PATH_VALUE_TO_CLASS_MAP: Record<PathValue, string> = {
  [Path.Unvisited]: '',
  [Path.Visited]: 'node--visited',
  [Path.Path]: 'node--path',
};
