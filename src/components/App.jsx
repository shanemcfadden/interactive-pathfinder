import { useState } from 'react';
import Dashboard from 'components/Dashboard';
import Grid from 'components/Grid';
import 'styles/App.css';
import { coordinatesAreEqual } from 'util/arr';

function App() {
  const [stateOfNodes, setStateOfNodes] = useState(
    Array.from({ length: 20 }, () => Array.from({ length: 20 }, () => 3))
  );
  const [startNode, setStartNode] = useState([4, 4]);
  const [endNode, setEndNode] = useState([7, 16]);
  const [stateOfPath, setStateOfPath] = useState(
    Array.from({ length: 20 }, (row, i) =>
      Array.from({ length: 20 }, (val, j) => {
        if (coordinatesAreEqual(startNode, [i, j])) return 3;
        if (coordinatesAreEqual(endNode, [i, j])) return 4;
        return 0;
      })
    )
  );
  const [currentClickFunction, setCurrentClickFunction] = useState('none');
  const [currentTexture, setCurrentTexture] = useState(null);
  const [findingPath, setFindingPath] = useState(false);

  const updateStartNode = (coor) => {
    if (coordinatesAreEqual(coor, endNode)) return;
    const updatedPath = [...stateOfPath];
    updatedPath[startNode[0]][startNode[1]] = 0;
    updatedPath[coor[0]][coor[1]] = 3;
    setStartNode(coor);
    setStateOfPath(updatedPath);
  };
  const updateEndNode = (coor) => {
    if (coordinatesAreEqual(coor, startNode)) return;
    const updatedPath = [...stateOfPath];
    updatedPath[endNode[0]][endNode[1]] = 0;
    updatedPath[coor[0]][coor[1]] = 4;
    setEndNode(coor);
    setStateOfPath(updatedPath);
  };
  const addPathNode = (coor) => {
    if (
      coordinatesAreEqual(coor, startNode) ||
      coordinatesAreEqual(coor, endNode)
    )
      return;
    const updatedPath = [...stateOfPath];
    updatedPath[coor[0]][coor[1]] = 2;
    setStateOfPath(updatedPath);
  };
  const addVisitedNode = (coor) => {
    if (
      coordinatesAreEqual(coor, startNode) ||
      coordinatesAreEqual(coor, endNode)
    )
      return;
    const updatedPath = [...stateOfPath];
    updatedPath[coor[0]][coor[1]] = 1;
    setStateOfPath(updatedPath);
  };
  const resetStateOfPath = () => {
    setStateOfPath(
      Array.from({ length: 20 }, (row, i) =>
        Array.from({ length: 20 }, (val, j) => {
          if (coordinatesAreEqual(startNode, [i, j])) return 3;
          if (coordinatesAreEqual(endNode, [i, j])) return 4;
          return 0;
        })
      )
    );
  };
  const clearVisitedNodes = () => {
    const updatedStateOfPath = stateOfPath.map((row) => {
      return row.map((val) => {
        return val === 1 ? 0 : val;
      });
    });
    setStateOfPath(updatedStateOfPath);
  };

  const createOnClickFunction = () => {
    const availableFunctions = {
      updateStartNode,
      updateEndNode,
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
        <h1 className="centered-text">Interactive pathfinder</h1>
        <p>
          Find the shortest path! Select a starting block and an ending block.
          To make things trickier, draw some walls for the pathfinder to dodge.
          Once you press find path, the computer will search for the shortest
          path using Dijkstra's algorithm.
        </p>
        <p>
          Make a guess, and see if you can beat the computer at its own game!
        </p>
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
