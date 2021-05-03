import MinHeap from 'models/MinHeap';
import { coordinatesAreEqual } from 'util/arr';

/**
 * @function
 * @param {Coordinate} startingCoordinates
 * @param {Coordinate} endingCoordinates
 * @param {TextureGrid} initialGrid - Current texture values for grid
 * @param {addNodeCallback} addVisitedNode
 * @param {addNodeCallback} addPathNode
 * @param {finishedCallback} done - Callback to be run after dijkstra has finished running
 * @returns {NodeJS.Timeout} Timeout that is cleared by finding an easiest path, finding no possible paths, or by cancelling the timeout
 */
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
          done('No path found');
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

/**
 *
 * @param {CoordinateData} currentCoordinateData
 * @param {TextureGrid} grid
 * @param {MinHeap} coordinatesHeap
 */
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

/**
 *
 * @param {CoordinateData} coordinateData
 * @param {PreviousCoordinateMap} previousCoordinateMap
 */
function addToVisitedCoordinates(coordinateData, previousCoordinateMap) {
  previousCoordinateMap[JSON.stringify(coordinateData.coordinate)] =
    coordinateData.previousCoordinate;
}

/**
 *
 * @param {Coordinate} coordinate
 * @param {PreviousCoordinateMap} previousCoordinateMap
 * @returns {boolean}
 */
function coordinateHasBeenVisited(coordinate, previousCoordinateMap) {
  return !!previousCoordinateMap[JSON.stringify(coordinate)];
}

/**
 *
 * @param {Coordinate} currentCoordinate
 * @param {TextureGrid} grid
 * @returns {Coordinate[]}
 */
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

/**
 *
 * @param {Coordinate} finishCoordinate
 * @param {PreviousCoordinateMap} visitedCoordinates
 * @returns {Coordinate[]}
 */
function getStartToFinishPath(finishCoordinate, visitedCoordinates) {
  const startToFinishPath = [];
  let current = finishCoordinate;
  while (current !== 'start') {
    startToFinishPath.unshift(current);
    current = visitedCoordinates[JSON.stringify(current)];
  }
  return startToFinishPath;
}

/**
 *
 * @param {TextureGrid} grid
 * @param {Coordinate} startingCoordinates
 * @returns {MinHeap} Priority queue of CoordinateData starting with coordinate closest to startingCoordinates
 */
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

/**
 * @typedef {{
 *    distanceFromStart: number,
 *    previousCoordinate: string | Coordinate | null,
 *    coordinate: Coordinate
 * }} CoordinateData
 * @typedef {[number, number]} Coordinate
 * @typedef {Array<Array<number>>} TextureGrid
 * @typedef {Object.<string, Coordinate | 'start'>} PreviousCoordinateMap
 * An object with keys of stringified coordinates. Each key points to the coordinate that leads closer to the start.
 * The value for the key of the starting coordinate is "start".
 */

/**
 * @callback finishedCallback
 * @param {string} [errorMessage]
 * @returns {undefined}
 */

/**
 * @callback addNodeCallback
 * @param {Coordinate} corrdinate
 * @returns {undefined}
 */
