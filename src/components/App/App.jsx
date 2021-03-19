import { useEffect, useRef, useState } from 'react';
import Dashboard from '../Dashboard/Dashboard';
import Grid from '../Grid/Grid';
import './App.css';

function App() {
  const [stateOfNodes, setStateOfNodes] = useState(
    Array.from({ length: 20 }, (val, i) =>
      Array.from({ length: 20 }, (val2, j) => {
        if (i < 16 && j === 10) {
          return 'wall';
        }
        return undefined;
      })
    )
  );
  const [startNode, setStartNode] = useState([4, 4]);
  const [endNode, setEndNode] = useState([7, 16]);
  const [currentClickFunction, setCurrentClickFunction] = useState(
    'setStartNode'
  );
  // Make state that toggles whether walls are being made
  const [drawingWallsAllowed, setDrawingWallsAllowed] = useState(false);

  // make its change toggle the current click function state
  useEffect(() => {
    setCurrentClickFunction('none');
  }, [drawingWallsAllowed]);

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

  const clearStateOfNodes = () => {
    setStateOfNodes(
      Array.from({ length: 20 }, () =>
        Array.from({ length: 20 }, () => undefined)
      )
    );
  };

  const removeVisitedAndPathNodes = () => {
    const newNodes = [...stateOfNodes];

    setStateOfNodes(
      newNodes.map((row, i) => {
        return row.map((val, j) => {
          if (val === 'wall') {
            return val;
          }
          return undefined;
        });
      })
    );
  };

  useEffect(() => {
    // clearStateOfNodes();
    removeVisitedAndPathNodes();
  }, [startNode, endNode]);

  const createOnClickFunction = (functionName) => {
    const clickFunctionSettings =
      clickFunctionRef.current[currentClickFunction];
    return (i, j) => {
      clickFunctionSettings.currentFunction([i, j]);
      setCurrentClickFunction(clickFunctionSettings.nextFunction);
    };
  };
  // pass down that state to dashboard
  // pass down that state to grid
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
          drawingWallsAllowed={drawingWallsAllowed}
          setDrawingWallsAllowed={setDrawingWallsAllowed}
          // removeVisitedAndPathNodes={remo}
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
