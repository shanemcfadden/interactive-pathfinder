import { useEffect, useState } from 'react';
import Dashboard from 'components/Dashboard';
import Grid from 'components/Grid';
import 'styles/App.css';
import useStateOfPath from 'hooks/useStateOfPath';
import {
  CUSTOM_TERRAINS,
  DEFAULT_END_NODE,
  DEFAULT_START_NODE,
  GRID_HEIGHT_NODES,
  GRID_WIDTH_NODES,
  GRID_WIDTH_PX,
  MODAL_HEADER,
  PAGE_DESCRIPTION,
  PAGE_HEADER,
  TEXTURES_NAME_VALUE_MAP,
} from 'util/settings';
import Modal from './Modal';
import { shallowCopyOfGrid } from 'util/arr';

function App() {
  const [stateOfNodes, setStateOfNodes] = useState(
    Array.from({ length: GRID_HEIGHT_NODES }, () =>
      Array.from(
        { length: GRID_WIDTH_NODES },
        () => TEXTURES_NAME_VALUE_MAP.grass
      )
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
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [currentSampleTerrain, setSampleTerrain] = useState(null);

  useEffect(() => {
    if (currentSampleTerrain == null) return;
    const sampleData = CUSTOM_TERRAINS[currentSampleTerrain];
    setStateOfNodes(shallowCopyOfGrid(sampleData.stateOfNodes));
  }, [currentSampleTerrain, setStateOfNodes]);

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
  const setSampleTerrainToNull = () => {
    setSampleTerrain(null);
  };
  return (
    <div className="App dark-theme">
      <div
        className="content-container"
        style={{
          width: GRID_WIDTH_PX + 'px',
        }}
      >
        <div className="content-box light-theme">
          <h1 className="centered-text">{PAGE_HEADER}</h1>
          {PAGE_DESCRIPTION.map((paragraphText, i) => (
            <p key={`p-${i}`}>{paragraphText}</p>
          ))}
        </div>
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
          setModalIsOpen={setModalIsOpen}
          currentSampleTerrain={currentSampleTerrain}
          setSampleTerrain={setSampleTerrain}
        />
      </div>
      <Grid
        onClickFunction={createOnClickFunction(currentClickFunction)}
        stateOfNodes={stateOfNodes}
        setStateOfNodes={setStateOfNodes}
        findingPath={findingPath}
        stateOfPath={stateOfPath}
        currentTexture={currentTexture}
        setSampleTerrainToNull={setSampleTerrainToNull}
      />
      {modalIsOpen && (
        <Modal
          closeModalFunction={() => setModalIsOpen(false)}
          title={MODAL_HEADER}
          confirmLabel={'Reset'}
        />
      )}
    </div>
  );
}

export default App;
