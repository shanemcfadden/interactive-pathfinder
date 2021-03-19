import { useEffect, useRef, useState } from 'react';
import Dashboard from '../Dashboard/Dashboard';
import Grid from '../Grid/Grid';
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
      This is an interactive pathfinder
      <div className="content-container">
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
