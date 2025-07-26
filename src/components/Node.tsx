import '../styles/Node.css';
import type { Texture } from '../settings/textures';
import type { PATHS_NAME_VALUE_MAP } from '../settings/paths';
import type { MouseEventHandler } from 'react';

const Node = ({
  currentTexture,
  currentPathState,
  handleClick,
  handleOnMouseDown,
  handleOnMouseEnter,
  handleOnMouseUp,
}: {
  currentTexture: Texture;
  currentPathState: keyof typeof PATHS_NAME_VALUE_MAP;
  handleClick: () => void;
  handleOnMouseDown: MouseEventHandler;
  handleOnMouseEnter: MouseEventHandler;
  handleOnMouseUp: MouseEventHandler;
}) => (
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

export default Node;
