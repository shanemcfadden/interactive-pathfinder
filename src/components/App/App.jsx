import { useRef, useState } from 'react';
import Dashboard from '../Dashboard/Dashboard';
import Grid from '../Grid/Grid';
import './App.css';

function App() {
  const [startNode, setStartNode] = useState([5, 1]);
  const [endNode, setEndNode] = useState([17, 19]);
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
        <Dashboard setCurrentClickFunction={setCurrentClickFunction} />
        <Grid
          startNode={startNode}
          endNode={endNode}
          onClickFunction={createOnClickFunction(currentClickFunction)}
        />
      </div>
    </div>
  );
}

export default App;
