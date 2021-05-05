/**
 * Class representing a binary heap sorted with the minimum value at the top.
 * Functions as a priority queue.
 */
class MinHeap {
  /**
   * Creates a MinHeap.
   * @param {CompareFunction} compareFunction
   */
  constructor(compareFunction) {
    this.heap = [];
    this.compareFunction = compareFunction;
  }

  /**
   * Moves last element of the heap to its proper place.
   */
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

  /**
   * Gets indeces of any immediate children.
   * @param {number} currentIndex
   * @returns {[number, number] | [number, null] | [null, null]] }
   */
  getChildIndices(currentIndex) {
    const childIndeces = [currentIndex * 2 + 1, currentIndex * 2 + 2];
    return childIndeces.map((index) =>
      index >= this.heap.length ? null : index
    );
  }

  /**
   * Gets the index of immediate parent.
   * @param {number} currentIndex
   * @returns {number?}
   */
  getParentIndex(currentIndex) {
    if (currentIndex <= 0) return null;
    return Math.floor((currentIndex - 1) / 2);
  }

  /**
   * Uses compare function to determine whether a is less than b.
   * @param {*} a
   * @param {*} b
   * @returns {boolean}
   */
  isLessThan(a, b) {
    const compareValue = this.compareFunction(a, b);
    return compareValue < 0;
  }

  /**
   * Adds a value to the heap.
   * @param {*} value
   */
  push(value) {
    this.heap.push(value);
    this.bubbleUp();
  }

  /**
   * Removes minimum value from the heap.
   * @returns {* | undefined}
   */
  pop() {
    if (!this.heap.length) return undefined;
    this.swap(0, this.heap.length - 1);
    const poppedValue = this.heap.pop();
    this.sinkDown();
    return poppedValue;
  }

  /** Move top value of the heap to its proper place. */
  sinkDown() {
    let currentIndex = 0;
    let [leftChildIndex, rightChildIndex] = this.getChildIndices(currentIndex);

    while (leftChildIndex != null) {
      let leftChildValue = this.heap[leftChildIndex];
      let rightChildValue = this.heap[rightChildIndex];
      let smallestChildValue;
      let smallestChildIndex;

      if (
        rightChildValue == null ||
        this.isLessThan(leftChildValue, rightChildValue)
      ) {
        smallestChildIndex = leftChildIndex;
        smallestChildValue = leftChildValue;
      } else {
        smallestChildIndex = rightChildIndex;
        smallestChildValue = rightChildValue;
      }

      if (!this.isLessThan(smallestChildValue, this.heap[currentIndex])) break;

      this.swap(smallestChildIndex, currentIndex);
      currentIndex = smallestChildIndex;
      [leftChildIndex, rightChildIndex] = this.getChildIndices(currentIndex);
    }
  }

  /**
   * Switches the position of two values on the heap.
   * @param {number} i
   * @param {number} j
   */
  swap(i, j) {
    [this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]];
  }
}

export default MinHeap;

/**
 * Compares two values.
 * Returns a negative number if a is less than b.
 * Returns 0 if the values are equal.
 * Returns a positive number if b is less than a.
 * @callback CompareFunction
 * @param {*} a
 * @param {*} b
 * @returns {number}
 */
