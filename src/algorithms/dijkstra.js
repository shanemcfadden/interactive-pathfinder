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
