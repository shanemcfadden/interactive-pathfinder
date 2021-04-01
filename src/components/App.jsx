import { useState } from 'react';
import Dashboard from 'components/Dashboard';
import Grid from 'components/Grid';
import 'styles/App.css';
import useStateOfPath from 'hooks/useStateOfPath';
import {
  DEFAULT_END_NODE,
  DEFAULT_START_NODE,
  GRID_HEIGHT,
  GRID_WIDTH,
  PAGE_DESCRIPTION,
  PAGE_HEADER,
  TEXTURES_NAME_VALUE_MAP,
} from 'util/settings';

function App() {
  const [stateOfNodes, setStateOfNodes] = useState(
    Array.from({ length: GRID_HEIGHT }, () =>
      Array.from({ length: GRID_WIDTH }, () => TEXTURES_NAME_VALUE_MAP.grass)
    )
  );
  const [
    startNode,
    setStartNode,
    endNode,
    setEndNode,
    stateOfPath,
    addPathNode,
    resetStateOfPath,
    addVisitedNode,
    clearVisitedNodes,
  ] = useStateOfPath(DEFAULT_START_NODE, DEFAULT_END_NODE);
  const [currentClickFunction, setCurrentClickFunction] = useState('none');
  const [currentTexture, setCurrentTexture] = useState(null);
  const [findingPath, setFindingPath] = useState(false);
  const createOnClickFunction = () => {
    const availableFunctions = {
      updateStartNode: setStartNode,
      updateEndNode: setEndNode,
    };
    if (!currentClickFunction || !availableFunctions[currentClickFunction])
      return () => {};

    return (i, j) => {
      availableFunctions[currentClickFunction]([i, j]);
      setCurrentClickFunction(null);
    };
  };
  return (
    <div className="App">
      <div className="content-container">
        <h1 className="centered-text">{PAGE_HEADER}</h1>
        {PAGE_DESCRIPTION.map((paragraphText, i) => (
          <p key={`p-${i}`}>{paragraphText}</p>
        ))}
        <Dashboard
          startNode={startNode}
          endNode={endNode}
          setCurrentClickFunction={setCurrentClickFunction}
          stateOfNodes={stateOfNodes}
          currentTexture={currentTexture}
          setCurrentTexture={setCurrentTexture}
          setFindingPath={setFindingPath}
          addPathNode={addPathNode}
          addVisitedNode={addVisitedNode}
          resetStateOfPath={resetStateOfPath}
          clearVisitedNodes={clearVisitedNodes}
        />
        <Grid
          onClickFunction={createOnClickFunction(currentClickFunction)}
          stateOfNodes={stateOfNodes}
          setStateOfNodes={setStateOfNodes}
          findingPath={findingPath}
          stateOfPath={stateOfPath}
          currentTexture={currentTexture}
        />
      </div>
    </div>
  );
}

export default App;
