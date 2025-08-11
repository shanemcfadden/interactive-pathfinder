import { MinHeap } from "../../min-heap";
import { areCoordinatesEqual, type Coordinate } from "../../coordinate";
import { Grid } from "../../grid";
import { PreviousCoordinateMap } from "./PreviousCoordinateMap";
import type { CompleteCalculation, CoordinateData, PathAction } from "./types";

export function* getDijkstraGenerator(
  start: Coordinate,
  end: Coordinate,
  initialGrid: Grid<number>,
): Generator<PathAction, CompleteCalculation> {
  const grid = initialGrid.shallowCopyOfGrid();

  // Make the end coordinate accessible even if the weight is Infinity
  grid.setCoordinate(end, 1);
  const coordinatesDataMinHeap = initializeCoordinateDataMinHeap(grid, start);

  const previousCoordinateMap = new PreviousCoordinateMap();
  let pathToEnd: Coordinate[] | null = null;

  while (!pathToEnd) {
    const currentCoordinateData = coordinatesDataMinHeap.pop();
    if (!currentCoordinateData) {
      throw new Error("No coordinates left in heap");
    }

    if (currentCoordinateData.distanceFromStart === Infinity) {
      return {
        type: "COMPLETE_CALCULATION",
        isPathFound: false,
      };
    }

    if (
      previousCoordinateMap.hasCoordinateBeenVisited(
        currentCoordinateData.coordinate,
      )
    ) {
      continue;
    }

    previousCoordinateMap.setPreviousCoordinate(
      currentCoordinateData.coordinate,
      currentCoordinateData.previousCoordinate,
    );

    if (areCoordinatesEqual(currentCoordinateData.coordinate, end)) {
      pathToEnd = previousCoordinateMap.getPathToEnd(end);
      break;
    }

    yield {
      type: "ADD_VISITED_COORDINATE",
      coordinate: currentCoordinateData.coordinate,
    };
    addNeighboringCoordinateDataToMinHeap(
      currentCoordinateData,
      grid,
      coordinatesDataMinHeap,
    );
  }

  for (const coordinate of pathToEnd) {
    yield {
      type: "ADD_PATH_COORDINATE",
      coordinate,
    };
  }

  return {
    type: "COMPLETE_CALCULATION",
    isPathFound: true,
  };
}

function addNeighboringCoordinateDataToMinHeap(
  currentCoordinateData: CoordinateData,
  grid: Grid<number>,
  coordinatesHeap: MinHeap<CoordinateData>,
) {
  coordinatesHeap.push(
    ...grid
      .getNeighboringCoordinates(currentCoordinateData.coordinate)
      .map((neighboringCoordinate) => {
        const neighboringCoordinateDistance = grid.getCoordinate(
          neighboringCoordinate,
        );

        return {
          coordinate: neighboringCoordinate,
          distanceFromStart:
            currentCoordinateData.distanceFromStart +
            neighboringCoordinateDistance,
          previousCoordinate: currentCoordinateData.coordinate,
        };
      }),
  );
}

function initializeCoordinateDataMinHeap(
  grid: Grid<number>,
  start: Coordinate,
): MinHeap<CoordinateData> {
  const coordinatesHeap = new MinHeap<CoordinateData>(
    (a, b) => a.distanceFromStart - b.distanceFromStart,
  );

  coordinatesHeap.push(
    ...grid.flatMap(
      (_, [a, b]): CoordinateData =>
        areCoordinatesEqual([a, b], start)
          ? {
              coordinate: start,
              distanceFromStart: 0,
              previousCoordinate: null,
            }
          : {
              coordinate: [a, b],
              distanceFromStart: Infinity,
              previousCoordinate: null,
            },
    ),
  );

  return coordinatesHeap;
}
