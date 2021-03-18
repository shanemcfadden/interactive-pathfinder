class MinHeap {
  constructor(compareFunction) {
    this.heap = [];
    this.compareFunction = compareFunction;
  }

  bubbleUp() {
    let currentIndex = this.heap.length - 1;
    let parentIndex = this.getParentIndex(currentIndex);

    while (
      parentIndex != null &&
      this.isLessThan(this.heap[currentIndex], this.heap[parentIndex])
    ) {
      this.swap(currentIndex, parentIndex);
      currentIndex = parentIndex;
      parentIndex = this.getParentIndex(currentIndex);
    }
  }

  getChildIndices(currentIndex) {
    const childIndeces = [currentIndex * 2 + 1, currentIndex * 2 + 2];
    return childIndeces.map((index) =>
      index >= this.heap.length ? null : index
    );
  }

  getParentIndex(currentIndex) {
    if (currentIndex <= 0) return null;
    return Math.floor((currentIndex - 1) / 2);
  }

  isLessThan(a, b) {
    const compareValue = this.compareFunction(a, b);
    return compareValue < 0;
  }

  push(value) {
    this.heap.push(value);
    this.bubbleUp();
  }

  pop() {
    if (!this.heap.length) return undefined;
    this.swap(0, this.heap.length - 1);
    const poppedValue = this.heap.pop();
    this.sinkDown();
    return poppedValue;
  }

  sinkDown() {
    let currentIndex = 0;
    let [leftChildIndex, rightChildIndex] = this.getChildIndices(currentIndex);

    while (leftChildIndex != null) {
      let leftChildValue = this.heap[leftChildIndex];
      let rightChildValue = this.heap[rightChildIndex];
      let smallestChildValue;
      let smallestChildIndex;

      if (rightChildValue == null) {
        smallestChildIndex = leftChildIndex;
        smallestChildValue = leftChildValue;
      } else {
        if (this.isLessThan(leftChildValue, rightChildValue)) {
          smallestChildIndex = leftChildIndex;
          smallestChildValue = leftChildValue;
        } else {
          smallestChildIndex = rightChildIndex;
          smallestChildValue = rightChildValue;
        }
      }

      if (!this.isLessThan(smallestChildValue, this.heap[currentIndex])) break;

      this.swap(smallestChildIndex, currentIndex);
      currentIndex = smallestChildIndex;
      [leftChildIndex, rightChildIndex] = this.getChildIndices(currentIndex);
    }
  }

  swap(i, j) {
    [this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]];
  }
}

const dijkstra = (startingCoordinates, endingCoordinates, grid) => {
  // For now, the grid is going to be an array of arrays of 1's and 0's
  // The 1's are accessible to the neighboring accessible nodes (only vertically and horizontally)
  // The 0's are not accessible to any node
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

  const previousCoordinateMap = {};
  let finalCoordinateData;

  while (true) {
    let current = coordinatesHeap.pop();
    if (previousCoordinateMap[JSON.stringify(current.coordinate)]) {
      // previous coordinate has been set, therefore it has already been visited
      // via a shorter path
      continue;
    }

    previousCoordinateMap[JSON.stringify(current.coordinate)] =
      current.previousCoordinate;
    if (
      JSON.stringify(current.coordinate) ===
        JSON.stringify(endingCoordinates) ||
      current.distanceFromStart === Infinity
    ) {
      finalCoordinateData = current;
      break;
    }

    const neigboringCoordinates = getNeighboringCoordinates(
      current.coordinate,
      grid
    );
    neigboringCoordinates.forEach((coor) => {
      if (!neigboringCoordinates[JSON.stringify(coor)]) {
        let newCoordinateData = {
          coordinate: coor,
          distanceFromStart: current.distanceFromStart + 1,
          previousCoordinate: current.coordinate,
        };
        coordinatesHeap.push(newCoordinateData);
      }
    });
  }

  if (finalCoordinateData.distanceFromStart === Infinity) return null;
  return getStartToFinishPath(
    finalCoordinateData.coordinate,
    previousCoordinateMap
  );
};

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

const fakeGrid = [
  [1, 1, 1, 1, 1, 1],
  [0, 0, 0, 1, 0, 1],
  [1, 1, 1, 1, 0, 1],
  [1, 0, 0, 0, 0, 1],
  [1, 1, 1, 1, 1, 1],
];

console.log(dijkstra([0, 0], [4, 0], fakeGrid));
