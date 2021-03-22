import { useEffect, useRef, useState } from 'react';
import Dashboard from 'components/Dashboard/Dashboard';
import Grid from 'components/Grid/Grid';
import './App.css';

function App() {
  const [stateOfNodes, setStateOfNodes] = useState(
    Array.from({ length: 20 }, () => Array.from({ length: 20 }))
  );
  const [startNode, setStartNode] = useState([4, 4]);
  const [endNode, setEndNode] = useState([7, 16]);
  const [currentClickFunction, setCurrentClickFunction] = useState('none');
  const [drawingWallsAllowed, setDrawingWallsAllowed] = useState(false);

  useEffect(() => {
    if (drawingWallsAllowed) {
      setCurrentClickFunction('none');
    }
  }, [drawingWallsAllowed]);

  const clickFunctionRef = useRef({
    setStartNode,
    setEndNode,
    none: () => {},
  });

  const createOnClickFunction = () => {
    return (i, j) => {
      clickFunctionRef.current[currentClickFunction]([i, j]);
      setCurrentClickFunction('none');
    };
  };
  return (
    <div className="App">
      <div className="content-container">
        <h1 className="centered-text">Interactive pathfinder</h1>
        <p>
          Find the shortest path! Select a starting block and an ending block.
          Add walls to make things tricker. Once you press find path, the
          computer will the shortest path using Dijkstra's algorithm.
        </p>
        <p>
          Make a guess, and see if you can beat the computer at its own game!
        </p>
        <Dashboard
          setCurrentClickFunction={setCurrentClickFunction}
          startNode={startNode}
          endNode={endNode}
          stateOfNodes={stateOfNodes}
          setStateOfNodes={setStateOfNodes}
          drawingWallsAllowed={drawingWallsAllowed}
          setDrawingWallsAllowed={setDrawingWallsAllowed}
        />
        <Grid
          startNode={startNode}
          endNode={endNode}
          onClickFunction={createOnClickFunction(currentClickFunction)}
          stateOfNodes={stateOfNodes}
          setStateOfNodes={setStateOfNodes}
          drawingWallsAllowed={drawingWallsAllowed}
        />
      </div>
    </div>
  );
}

export default App;
