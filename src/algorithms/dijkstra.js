import MinHeap from 'models/MinHeap';
import { coordinatesAreEqual } from 'util/arr';

export const dijkstra = (
  startingCoordinates,
  endingCoordinates,
  initialGrid,
  addVisitedNode,
  addPathNode,
  done
) => {
  const grid = initialGrid.map((row) => row.slice());
  // Make the end node accessible even if the weight is Infinity
  grid[endingCoordinates[0]][endingCoordinates[1]] = 1;
  console.log('initialGrid', initialGrid);
  console.log('grid', grid);
  const coordinatesHeap = initializeCoordinatesHeap(grid, startingCoordinates);

  const previousCoordinateMap = {};
  let finalCoordinateData;
  let path;
  let pathFound = false;
  let displayedPathNodes = 0;

  const interval = setInterval(() => {
    if (!pathFound) {
      let current = coordinatesHeap.pop();
      if (
        !coordinateHasBeenVisited(current.coordinate, previousCoordinateMap)
      ) {
        addToVisitedCoordinates(current, previousCoordinateMap);
        if (current.distanceFromStart === Infinity) {
          clearInterval(interval);
          done();
        } else if (coordinatesAreEqual(current.coordinate, endingCoordinates)) {
          pathFound = true;
          finalCoordinateData = current;
          path = getStartToFinishPath(
            finalCoordinateData.coordinate,
            previousCoordinateMap
          );
        } else {
          addVisitedNode(current.coordinate);
          addNeighboringCoordinatesToHeap(current, grid, coordinatesHeap);
        }
      }
    } else {
      if (displayedPathNodes < path.length) {
        addPathNode(path[displayedPathNodes++]);
      } else {
        clearInterval(interval);
        done();
      }
    }
  }, 10);
  return interval;
};

function addNeighboringCoordinatesToHeap(
  currentCoordinateData,
  grid,
  coordinatesHeap
) {
  const neigboringCoordinates = getNeighboringCoordinates(
    currentCoordinateData.coordinate,
    grid
  );
  neigboringCoordinates.forEach((neighbor) => {
    let newCoordinateData = {
      coordinate: neighbor.coordinate,
      distanceFromStart:
        currentCoordinateData.distanceFromStart + neighbor.distanceFromCurrent,
      previousCoordinate: currentCoordinateData.coordinate,
    };
    coordinatesHeap.push(newCoordinateData);
  });
}

function addToVisitedCoordinates(coordinateData, previousCoordinateMap) {
  previousCoordinateMap[JSON.stringify(coordinateData.coordinate)] =
    coordinateData.previousCoordinate;
}

function coordinateHasBeenVisited(coordinate, previousCoordinateMap) {
  return !!previousCoordinateMap[JSON.stringify(coordinate)];
}

function getNeighboringCoordinates(currentCoordinate, grid) {
  const neighbors = [];
  const [i, j] = currentCoordinate;
  const possibleNeighbors = [
    [i - 1, j],
    [i, j - 1],
    [i + 1, j],
    [i, j + 1],
  ];
  possibleNeighbors.forEach(([a, b]) => {
    if (a >= 0 && a < grid.length && b >= 0 && b < grid[0].length) {
      neighbors.push({
        coordinate: [a, b],
        distanceFromCurrent: grid[a][b],
      });
    }
  });
  return neighbors;
}

function getStartToFinishPath(finishCoordinate, visitedCoordinates) {
  const startToFinishPath = [];
  let current = finishCoordinate;
  while (current !== 'start') {
    startToFinishPath.unshift(current);
    current = visitedCoordinates[JSON.stringify(current)];
  }
  return startToFinishPath;
}

function initializeCoordinatesHeap(grid, startingCoordinates) {
  const coordinatesHeap = new MinHeap(
    (a, b) => a.distanceFromStart - b.distanceFromStart
  );
  grid.forEach((row, i) => {
    row.forEach((val, j) => {
      const coordinateData = {
        coordinate: [i, j],
        previousCoordinate: null,
        distanceFromStart: Infinity,
      };
      if (i === startingCoordinates[0] && j === startingCoordinates[1]) {
        coordinateData.distanceFromStart = 0;
        coordinateData.previousCoordinate = 'start';
      }
      coordinatesHeap.push(coordinateData);
    });
  });
  return coordinatesHeap;
}

// const fakeGrid = [
//   [1, 5, 1, 1, 1, 1],
//   [0, 2, 0, 1, 0, 1],
//   [1, Infinity, 1, 1, 0, 1],
//   [1, Infinity, 0, 0, 0, 1],
//   [1, 1, 1, 1, 1, 1],
// ];

// console.log(dijkstra([0, 0], [4, 0], fakeGrid));

// const fakeStateGrid = [
//   [null, null, true, 'bunk'],
//   [null, null, true, 'bunk'],
//   [null, null, true, 'bunk'],
//   [null, null, true, 'bunk'],
// ];
// console.log(changeToOnesAndZeros(fakeStateGrid));
