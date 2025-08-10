type CompareFunction<T> = (a: T, b: T) => number;

/**
 * Class representing a binary heap sorted with the minimum value at the top.
 * Functions as a priority queue.
 */
export class MinHeap<T> {
  private heap: T[];
  private compareFunction: CompareFunction<T>;

  constructor(compareFunction: CompareFunction<T>) {
    this.heap = [];
    this.compareFunction = compareFunction;
  }

  /**
   * Moves last element of the heap to its proper place.
   */
  private bubbleUp() {
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

  private getChildIndices(currentIndex: number): (number | null)[] {
    const childIndeces = [currentIndex * 2 + 1, currentIndex * 2 + 2];
    return childIndeces.map((index) =>
      index >= this.heap.length ? null : index,
    );
  }

  private getParentIndex(currentIndex: number): number | null {
    if (currentIndex <= 0) {
      return null;
    }
    return Math.floor((currentIndex - 1) / 2);
  }

  private isLessThan(a: T, b: T): boolean {
    const compareValue = this.compareFunction(a, b);
    return compareValue < 0;
  }

  public push(...values: T[]): void {
    for (const value of values) {
      this.heap.push(value);
      this.bubbleUp();
    }
  }

  public pop(): T | undefined {
    if (!this.heap.length) {
      return undefined;
    }
    this.swap(0, this.heap.length - 1);
    const poppedValue = this.heap.pop();
    this.sinkDown();
    return poppedValue;
  }

  /** Move top value of the heap to its proper place. */
  private sinkDown() {
    let currentIndex = 0;
    let [leftChildIndex, rightChildIndex] = this.getChildIndices(currentIndex);

    while (leftChildIndex !== null) {
      const leftChildValue = this.heap[leftChildIndex];
      const rightChildValue =
        rightChildIndex === null ? null : this.heap[rightChildIndex];
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

      if (!this.isLessThan(smallestChildValue, this.heap[currentIndex])) {
        break;
      }

      if (smallestChildIndex === null) {
        throw new Error("Smallest child index is null");
      }

      this.swap(smallestChildIndex, currentIndex);
      currentIndex = smallestChildIndex;
      [leftChildIndex, rightChildIndex] = this.getChildIndices(currentIndex);
    }
  }

  swap(i: number, j: number): void {
    [this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]];
  }
}
