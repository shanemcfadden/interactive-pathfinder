import MinHeap from '../models/MinHeap';
import { coordinatesAreEqual, type Coordinate } from '../util/arr';
import type { Grid } from '../util/grid';

/**
 * Find the shortest path using Dijkstra's algorithm
 * @function
 * @param {Coordinate} startingCoordinates
 * @param {Coordinate} endingCoordinates
 * @param {TextureGrid} initialGrid - Current texture values for grid
 * @param {addNodeCallback} addVisitedNode
 *     Function that adds a visited node to the grid state
 * @param {addNodeCallback} addPathNode
 *     Function that adds a path node to the grid state
 * @param {finishedCallback} done
 *     Callback to be run after dijkstra has finished running
 * @returns {NodeJS.Timeout}
 *     Timeout that is cleared by finding an easiest path, finding no possible
 *     paths, or by cancelling the timeout
 */
export const dijkstra = (
  startingCoordinates: Coordinate,
  endingCoordinates: Coordinate,
  initialGrid: Grid<number>,
  addVisitedNode: (node: Coordinate) => void,
  addPathNode: (node: Coordinate) => void,
  done: (errorMessage?: string) => void,
): number => {
  const grid = initialGrid.map((row) => row.slice());
  // Make the end node accessible even if the weight is Infinity
  grid[endingCoordinates[0]][endingCoordinates[1]] = 1;
  const coordinatesHeap = initializeCoordinatesHeap(grid, startingCoordinates);

  const previousCoordinateMap: PreviousCoordinateMap = {};
  let finalCoordinateData: CoordinateData;
  let path: Coordinate[];
  let pathFound = false;
  let displayedPathNodes = 0;

  const interval = setInterval(() => {
    if (!pathFound) {
      const current = coordinatesHeap.pop();
      if (!current) {
        throw new Error('No coordinates left in heap');
      }
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
            previousCoordinateMap,
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
 * Adds the coordinate data of every adjacent coordinate to the MinHeap
 * @param {CoordinateData} currentCoordinateData
 * @param {TextureGrid} grid
 * @param {MinHeap} coordinatesHeap
 */
function addNeighboringCoordinatesToHeap(
  currentCoordinateData: CoordinateData,
  grid: Grid<number>,
  coordinatesHeap: MinHeap<CoordinateData>,
) {
  const neigboringCoordinates = getNeighboringCoordinates(
    currentCoordinateData.coordinate,
    grid,
  );
  neigboringCoordinates.forEach((neighbor) => {
    const newCoordinateData = {
      coordinate: neighbor.coordinate,
      distanceFromStart:
        currentCoordinateData.distanceFromStart + neighbor.distanceFromCurrent,
      previousCoordinate: currentCoordinateData.coordinate,
    };
    coordinatesHeap.push(newCoordinateData);
  });
}

/**
 * Adds the current coordinate and its previous coordinate to the
 * previousCoordinateMap
 * @param {CoordinateData} coordinateData
 * @param {PreviousCoordinateMap} previousCoordinateMap
 */
function addToVisitedCoordinates(
  coordinateData: CoordinateData,
  previousCoordinateMap: PreviousCoordinateMap,
): void {
  if (coordinateData.previousCoordinate === null) {
    throw new Error('Previous coordinate cannot be null');
  }
  previousCoordinateMap[JSON.stringify(coordinateData.coordinate)] =
    coordinateData.previousCoordinate;
}

function coordinateHasBeenVisited(
  coordinate: Coordinate,
  previousCoordinateMap: PreviousCoordinateMap,
) {
  return !!previousCoordinateMap[JSON.stringify(coordinate)];
}

function getNeighboringCoordinates(
  currentCoordinate: Coordinate,
  grid: Grid<number>,
): {
  coordinate: Coordinate;
  distanceFromCurrent: number;
}[] {
  const neighbors: {
    coordinate: Coordinate;
    distanceFromCurrent: number;
  }[] = [];
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

function getStartToFinishPath(
  finishCoordinate: Coordinate,
  visitedCoordinates: PreviousCoordinateMap,
): Coordinate[] {
  const startToFinishPath = [];
  let current: 'start' | Coordinate = finishCoordinate;
  while (current !== 'start') {
    startToFinishPath.unshift(current);
    current = visitedCoordinates[JSON.stringify(current)];
  }
  return startToFinishPath;
}

/**
 * Add all coordinates to the priority queue as coordinates with a
 * distanceFromStart value of Infinity and previousCoordinate value of null.
 * The starting coordinate receives a distanceFromStart value of 0 and a
 * previousCoordinate value of 'start'
 * @param {TextureGrid} grid
 * @param {Coordinate} startingCoordinates
 * @returns {MinHeap} Priority queue of CoordinateData starting with coordinate closest to startingCoordinates
 */
function initializeCoordinatesHeap(
  grid: Grid<number>,
  startingCoordinates: Coordinate,
): MinHeap<CoordinateData> {
  const coordinatesHeap = new MinHeap<CoordinateData>(
    (a, b) => a.distanceFromStart - b.distanceFromStart,
  );
  grid.forEach((row, i) => {
    row.forEach((_, j) => {
      if (i === startingCoordinates[0] && j === startingCoordinates[1]) {
        coordinatesHeap.push({
          coordinate: [i, j],
          distanceFromStart: 0,
          previousCoordinate: 'start',
        });
      } else {
        coordinatesHeap.push({
          coordinate: [i, j],
          previousCoordinate: null,
          distanceFromStart: Infinity,
        });
      }
    });
  });
  return coordinatesHeap;
}

interface CoordinateData {
  distanceFromStart: number;
  previousCoordinate: 'start' | Coordinate | null;
  coordinate: Coordinate;
}

type PreviousCoordinateMap = Record<string, Coordinate | 'start'>;
