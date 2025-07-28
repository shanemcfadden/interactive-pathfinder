import { useEffect, useState } from 'react';
import Dashboard from './Dashboard';
import GridView from './GridView';
import Modal from './Modal';
import {
  MODAL_HEADER,
  PAGE_DESCRIPTION,
  PAGE_HEADER,
} from '../settings/content';
import {
  GRID_HEIGHT_NODES,
  GRID_WIDTH_NODES,
  GRID_WIDTH_PX,
} from '../settings/grid';
import { SAMPLE_TERRAINS } from '../settings/terrains';
import { TEXTURES_NAME_VALUE_MAP } from '../settings/textures';
import { getShallowCopyOfCoordinateIfDefined } from '../util/arr';
import '../styles/App.css';
import { usePathReducer } from '../hooks/usePathReducer';
import { Grid } from '../util/grid';

function App() {
  const [stateOfNodes, setStateOfNodes] = useState(
    new Grid(
      Array.from({ length: GRID_HEIGHT_NODES }, () =>
        Array.from(
          { length: GRID_WIDTH_NODES },
          () => TEXTURES_NAME_VALUE_MAP.grass,
        ),
      ),
    ),
  );
  const { startNode, endNode, stateOfPath, dispatchPath } = usePathReducer();
  const [currentClickFunction, setCurrentClickFunction] = useState<
    'updateEndNode' | 'updateStartNode' | null
  >(null);
  const [currentTexture, setCurrentTexture] = useState<number | null>(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [currentSampleTerrain, setSampleTerrain] = useState<number | null>(
    null,
  );

  useEffect(() => {
    if (currentSampleTerrain == null) {
      return;
    }
    const sampleData = SAMPLE_TERRAINS[currentSampleTerrain];

    const newStateOfNodes = sampleData.stateOfNodes.map(
      (val) => TEXTURES_NAME_VALUE_MAP[val],
    );
    const newStartNode = getShallowCopyOfCoordinateIfDefined(
      sampleData.startNode,
    );
    const newEndNode = getShallowCopyOfCoordinateIfDefined(sampleData.endNode);

    setStateOfNodes(newStateOfNodes);
    if (newStartNode) {
      dispatchPath({
        type: 'UPDATE_START_NODE',
        coordinate: newStartNode,
      });
    }
    if (newEndNode) {
      dispatchPath({
        type: 'UPDATE_END_NODE',
        coordinate: newEndNode,
      });
    }
  }, [currentSampleTerrain]); // eslint-disable-line react-hooks/exhaustive-deps

  const setSampleTerrainToNull = () => {
    setSampleTerrain(null);
  };
  const createOnClickFunction = () => {
    const availableFunctions = {
      updateStartNode: (coordinate: [number, number]) => {
        dispatchPath({
          type: 'UPDATE_START_NODE',
          coordinate,
        });
      },
      updateEndNode: (coordinate: [number, number]) => {
        dispatchPath({
          type: 'UPDATE_END_NODE',
          coordinate,
        });
      },
    };
    if (!currentClickFunction || !availableFunctions[currentClickFunction]) {
      return () => {};
    }

    return (i: number, j: number) => {
      availableFunctions[currentClickFunction]([i, j]);
      setCurrentClickFunction(null);
      setSampleTerrainToNull();
    };
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
          {PAGE_DESCRIPTION}
        </div>
        <Dashboard
          startNode={startNode}
          endNode={endNode}
          setCurrentClickFunction={setCurrentClickFunction}
          stateOfNodes={stateOfNodes}
          currentTexture={currentTexture}
          setCurrentTexture={setCurrentTexture}
          dispatchPath={dispatchPath}
          setModalIsOpen={setModalIsOpen}
          currentSampleTerrain={currentSampleTerrain}
          setSampleTerrain={setSampleTerrain}
        />
        <GridView
          onClickFunction={createOnClickFunction()}
          stateOfNodes={stateOfNodes}
          setStateOfNodes={setStateOfNodes}
          stateOfPath={stateOfPath}
          currentTexture={currentTexture}
          setSampleTerrainToNull={setSampleTerrainToNull}
        />
      </div>
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
