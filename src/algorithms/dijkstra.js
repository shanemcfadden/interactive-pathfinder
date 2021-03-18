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
  // starting and ending coordinates are an array pair of indices
  // Setup:
  // Initialize a heap with the proper comparison function
  // This will allow us to traverse the grid from nearest point to farthest point
  const coordinatesHeap = new MinHeap(
    (a, b) => a.distanceFromStart < b.distanceFromStart
  );

  // Add EVERY point on grid to the heap, recording its distance from start as infinity and its previous coordinate as 0
  grid.forEach((row, i) => {
    row.forEach((val, j) => {
      const coordinateData = {
        coordinate: [i, j],
        previousCoordinate: null,
      };
      if (i === startingCoordinates[0] && j === startingCoordinates[1]) {
        // for the starting coordinate, add it to the heap with its distance from the start being 0
        coordinateData.distanceFromStart = 0;
      } else {
        coordinateData.distanceFromStart = Infinity;
      }
      coordinatesHeap.push(coordinateData);
    });
  });

  // Initialize an object recording the visited coordinates
  // The keys will be stringified versions of the coordinate array

  const visitedCoordinates = {};

  // loop through the heap
  while (true) {
    // pop off the minimum heap value
    const currentCoordinate = coordinatesHeap.pop();
    // if this value is the ending coordinate OR the distance from the start is Infinity, break the loop
    if (
      (currentCoordinate.coordinate[0] === endingCoordinates[0] &&
        currentCoordinate.coordinate[1] === endingCoordinates[1]) ||
      currentCoordinate.distanceFromStart === Infinity
    ) {
      break;
    }

    // add this coordinate to the visited coordinates object
    visitedCoordinates[JSON.stringify(currentCoordinate.coordinate)] = true;

    // get the accessible coordinates that neighbor the current value
    const neigboringCoordinates = getNeighboringCoordinates(
      currentCoordinate.coordinate,
      grid
    );
    // For each of the neighboring coordinates:
    neigboringCoordinates.forEach((coor) => {
      // if the coordinate has been visited, do nothing
      // if the coordinate has not been visited, add it to the heap with its current distance from start and previous coordinate
      if (!neigboringCoordinates[JSON.stringify(coor)]) {
        const newCoordinateData = {
          coordinate: coor,
          distanceFromStart: currentCoordinate.distanceFromStart + 1,
          previousCoordinate: currentCoordinate.coordinate,
        };
        coordinatesHeap.push(newCoordinateData);
      }
    });
  }
  // if the distance from the start is Infinity, return null
  // Otherwise, return an object with the path of start to finish in an array, (plus the distance? this is already established by length of arr - 1......)
};

function getNeighboringCoordinates(currentCoordinate, grid) {}
