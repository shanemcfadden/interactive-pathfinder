import MinHeap from '../models/MinHeap';
import { coordinatesAreEqual, type Coordinate } from '../util/arr';
import { shallowCopyOfGrid, type Grid } from '../util/grid';

type PathAction = AddVisitedCoordinate | AddPathCoordinate;

interface AddVisitedCoordinate {
  type: 'ADD_VISITED_COORDINATE';
  coordinate: Coordinate;
}
interface AddPathCoordinate {
  type: 'ADD_PATH_COORDINATE';
  coordinate: Coordinate;
}

interface CompleteCalculation {
  type: 'COMPLETE_CALCULATION';
  pathFound: boolean;
}

export function* getDijkstraGenerator(
  startingCoordinate: Coordinate,
  endingCoordinate: Coordinate,
  initialGrid: Grid<number>,
): Generator<PathAction, CompleteCalculation> {
  const grid = shallowCopyOfGrid(initialGrid);
  // Make the end coordinate accessible even if the weight is Infinity
  grid[endingCoordinate[0]][endingCoordinate[1]] = 1;
  const coordinatesHeap = initializeCoordinatesHeap(grid, startingCoordinate);

  const previousCoordinateMap: PreviousCoordinateMap = {};
  let finalCoordinateData: CoordinateData;
  let path: Coordinate[] = [];
  let pathFound = false;
  let addedPathCoordinates = 0;

  while (!pathFound) {
    const current = coordinatesHeap.pop();
    if (!current) {
      throw new Error('No coordinates left in heap');
    }

    if (current.distanceFromStart === Infinity) {
      return {
        type: 'COMPLETE_CALCULATION',
        pathFound: false,
      };
    }
    if (coordinateHasBeenVisited(current.coordinate, previousCoordinateMap)) {
      continue;
    }

    addToVisitedCoordinates(current, previousCoordinateMap);
    if (coordinatesAreEqual(current.coordinate, endingCoordinate)) {
      pathFound = true;
      finalCoordinateData = current;
      path = getStartToFinishPath(
        finalCoordinateData.coordinate,
        previousCoordinateMap,
      );
    } else {
      yield {
        type: 'ADD_VISITED_COORDINATE',
        coordinate: current.coordinate,
      };
      addNeighboringCoordinatesToHeap(current, grid, coordinatesHeap);
    }
  }

  while (addedPathCoordinates < path.length) {
    yield {
      type: 'ADD_PATH_COORDINATE',
      coordinate: path[addedPathCoordinates],
    };
    addedPathCoordinates++;
  }

  return {
    type: 'COMPLETE_CALCULATION',
    pathFound: true,
  };
}

function addNeighboringCoordinatesToHeap(
  currentCoordinateData: CoordinateData,
  grid: Grid<number>,
  coordinatesHeap: MinHeap<CoordinateData>,
) {
  const neigboringCoordinates = getNeighboringCoordinates(
    currentCoordinateData.coordinate,
    grid,
  );

  neigboringCoordinates.forEach((neighboringCoordinate) => {
    const neighboringCoordinateDistance =
      grid[neighboringCoordinate[0]][neighboringCoordinate[1]];

    coordinatesHeap.push({
      coordinate: neighboringCoordinate,
      distanceFromStart:
        currentCoordinateData.distanceFromStart + neighboringCoordinateDistance,
      previousCoordinate: currentCoordinateData.coordinate,
    });
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
  // TODO: We're getting this error when trying the all water grid
  //  Fix this in the generator
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
  [i, j]: Coordinate,
  grid: Grid<number>,
): Coordinate[] {
  const possibleNeighbors: Coordinate[] = [
    [i - 1, j],
    [i, j - 1],
    [i + 1, j],
    [i, j + 1],
  ];

  return possibleNeighbors.filter(([a, b]) => grid[a]?.[b] !== undefined);
}

function getStartToFinishPath(
  finishCoordinate: Coordinate,
  visitedCoordinates: PreviousCoordinateMap,
): Coordinate[] {
  const startToFinishPath = [];
  let current: 'start' | Coordinate = finishCoordinate;

  while (current !== 'start') {
    startToFinishPath.push(current);
    current = visitedCoordinates[JSON.stringify(current)];
  }

  return startToFinishPath.reverse();
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
