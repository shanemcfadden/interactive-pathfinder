import MinHeap from '../models/MinHeap';

export const dijkstra = (
  startingCoordinates,
  endingCoordinates,
  gridWithState,
  addVisitedNode,
  addPathNode
) => {
  // For now, the grid is going to be an array of arrays of 1's and 0's
  // The 1's are accessible to the neighboring accessible nodes (only vertically and horizontally)
  // The 0's are not accessible to any node
  const grid = convertGridWithStateToOnesAndZeros(gridWithState);
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
        addVisitedNode(current.coordinate);
        if (current.distanceFromStart === Infinity) {
          clearInterval(interval);
        } else if (coordinatesAreEqual(current.coordinate, endingCoordinates)) {
          pathFound = true;
          finalCoordinateData = current;
          path = getStartToFinishPath(
            finalCoordinateData.coordinate,
            previousCoordinateMap
          );
        } else {
          addNeighboringCoordinatesToHeap(current, grid, coordinatesHeap);
        }
      }
    } else {
      if (displayedPathNodes < path.length) {
        addPathNode(path[displayedPathNodes++]);
      } else {
        clearInterval(interval);
      }
    }
  }, 10);
  return;
};

function addNeighboringCoordinatesToHeap(
  coordinateData,
  grid,
  coordinatesHeap
) {
  const neigboringCoordinates = getNeighboringCoordinates(
    coordinateData.coordinate,
    grid
  );
  neigboringCoordinates.forEach((coor) => {
    let newCoordinateData = {
      coordinate: coor,
      distanceFromStart: coordinateData.distanceFromStart + 1,
      previousCoordinate: coordinateData.coordinate,
    };
    coordinatesHeap.push(newCoordinateData);
  });
}

function addToVisitedCoordinates(coordinateData, previousCoordinateMap) {
  previousCoordinateMap[JSON.stringify(coordinateData.coordinate)] =
    coordinateData.previousCoordinate;
}

function convertGridWithStateToOnesAndZeros(gridWithState) {
  return Array.from({ length: gridWithState.length }, () =>
    Array.from({ length: gridWithState[0].length }, () => 1)
  );
}

function coordinatesAreEqual(coor1, coor2) {
  return JSON.stringify(coor1) === JSON.stringify(coor2);
}

function coordinateHasBeenVisited(coordinate, previousCoordinateMap) {
  return !!previousCoordinateMap[JSON.stringify(coordinate)];
}

function getNeighboringCoordinates(currentCoordinate, grid) {
  const neighbors = [];
  const [i, j] = currentCoordinate;
  // top
  if (i > 0 && grid[i - 1][j]) {
    neighbors.push([i - 1, j]);
  }
  // right
  if (j < grid[0].length - 1 && grid[i][j + 1]) {
    neighbors.push([i, j + 1]);
  }
  // bottom
  if (i < grid.length - 1 && grid[i + 1][j]) {
    neighbors.push([i + 1, j]);
  }
  // left
  if (j > 0 && grid[i][j - 1]) {
    neighbors.push([i, j - 1]);
  }
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
//   [1, 1, 1, 1, 1, 1],
//   [0, 0, 0, 1, 0, 1],
//   [1, 1, 1, 1, 0, 1],
//   [1, 0, 0, 0, 0, 1],
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
