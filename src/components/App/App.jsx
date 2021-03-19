import { useEffect, useRef, useState } from 'react';
import Dashboard from '../Dashboard/Dashboard';
import Grid from '../Grid/Grid';
import './App.css';

function App() {
  const [stateOfNodes, setStateOfNodes] = useState(
    Array.from({ length: 20 }, () => Array.from({ length: 20 }))
  );
  const [startNode, setStartNode] = useState([4, 4]);
  const [endNode, setEndNode] = useState([7, 9]);
  const [currentClickFunction, setCurrentClickFunction] = useState(
    'setStartNode'
  );
  const clickFunctionRef = useRef({
    setStartNode: {
      currentFunction: setStartNode,
      nextFunction: 'setEndNode',
    },
    setEndNode: {
      currentFunction: setEndNode,
      nextFunction: 'none',
    },
    none: {
      currentFunction: () => {},
      nextFunction: 'none',
    },
  });

  useEffect(() => {
    clearStateOfNodes();
  }, [startNode, endNode]);

  const clearStateOfNodes = () => {
    setStateOfNodes(
      Array.from({ length: 20 }, () =>
        Array.from({ length: 20 }, () => undefined)
      )
    );
  };

  const createOnClickFunction = (functionName) => {
    const clickFunctionSettings =
      clickFunctionRef.current[currentClickFunction];
    return (i, j) => {
      clickFunctionSettings.currentFunction([i, j]);
      setCurrentClickFunction(clickFunctionSettings.nextFunction);
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
          clearStateOfNodes={clearStateOfNodes}
        />
        <Grid
          startNode={startNode}
          endNode={endNode}
          onClickFunction={createOnClickFunction(currentClickFunction)}
          stateOfNodes={stateOfNodes}
        />
      </div>
    </div>
  );
}

export default App;
