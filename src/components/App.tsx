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
import { TextureWeight } from '../settings/textures';
// import { getShallowCopyOfCoordinateIfDefined } from '../util/arr';
import '../styles/App.css';
import { usePathReducer } from '../hooks/usePathReducer';
import { Grid } from '../util/grid';
import { getShallowCopyOfCoordinateIfDefined } from '../util/arr';

function App() {
  const [stateOfPath, dispatchPath] = usePathReducer();
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

    const terrain = SAMPLE_TERRAINS[currentSampleTerrain];
    dispatchPath({
      type: 'USE_SAMPLE_TERRAIN',
      terrain: terrain.stateOfNodes,
      start: getShallowCopyOfCoordinateIfDefined(terrain.startNode),
      end: getShallowCopyOfCoordinateIfDefined(terrain.endNode),
    });
  }, [currentSampleTerrain]);

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
          startNode={stateOfPath.start}
          endNode={stateOfPath.end}
          setCurrentClickFunction={setCurrentClickFunction}
          terrain={stateOfPath.terrain}
          currentTexture={currentTexture}
          setCurrentTexture={setCurrentTexture}
          dispatchPath={dispatchPath}
          setModalIsOpen={setModalIsOpen}
          currentSampleTerrain={currentSampleTerrain}
          setSampleTerrain={setSampleTerrain}
        />
        <GridView
          onClickFunction={createOnClickFunction()}
          terrain={stateOfPath.terrain}
          dispatchPath={dispatchPath}
          // setStateOfNodes={setStateOfNodes}
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
