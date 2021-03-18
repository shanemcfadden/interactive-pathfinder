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
  // Add EVERY point on grid to the heap, recording its distance from start as infinity and its previous coordinate as 0
  // for the starting coordinate, add it to the heap with its distance from the start being 0
  // Initialize an object recording the visited coordinates
  // The keys will be stringified versions of the coordinate array
  // loop through the heap
  // pop off the minimum heap value
  // if this value is the ending coordinate OR the distance from the start is Infinity, break the loop
  // add this coordinate to the visited coordinates object
  // Otherwise, get the accessible coordinates that neighbor the current value
  // For each of the neighboring coordinates:
  // if the coordinate has been visited, do nothing
  // if the coordinate has been visited, add it to the heap with its current distance from start and previous coordinate
  // if the distance from the start is Infinity, return null
  // Otherwise, return an object with the path of start to finish in an array, (plus the distance? this is already established by length of arr - 1......)
};
