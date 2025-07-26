import MinHeap from './MinHeap';
import { it, expect } from 'vitest';
import fc from 'fast-check';

it('MinHeap pops the number of values that have been pushed.', () => {
  fc.assert(
    fc.property(fc.array(fc.integer()), (values) => {
      const heap = new MinHeap<number>((a, b) => a - b);
      values.forEach((value) => heap.push(value));
      values.forEach(() => {
        const poppedValue = heap.pop();
        expect(poppedValue).toBeDefined();
      });
      expect(heap.pop()).toBeUndefined();
    }),
  );
});
it('MinHeap pops the values from lowest to highest', () => {
  fc.assert(
    fc.property(fc.array(fc.integer()), (values) => {
      const heap = new MinHeap<number>((a, b) => a - b);
      values.forEach((value) => heap.push(value));
      const poppedValues: number[] = [];
      while (true) {
        const poppedValue = heap.pop();
        if (poppedValue === undefined) {
          break;
        }
        poppedValues.push(poppedValue);
      }
      expect(poppedValues).toEqual(values.sort((a, b) => a - b));
    }),
  );
});
it('MinHeap accepts custom comparison functions', () => {
  type ValueWithSequenceNumber = {
    sequenceNumber: number;
    value: string;
  };
  fc.assert(
    fc.property(
      fc.array(fc.record({ sequenceNumber: fc.integer(), value: fc.string() })),
      (values) => {
        const compareFunction = (
          a: ValueWithSequenceNumber,
          b: ValueWithSequenceNumber,
        ): number => a.sequenceNumber - b.sequenceNumber;
        const heap = new MinHeap<ValueWithSequenceNumber>(compareFunction);
        values.forEach((value) => heap.push(value));
        const poppedValues: ValueWithSequenceNumber[] = [];
        while (true) {
          const poppedValue = heap.pop();
          if (poppedValue === undefined) {
            break;
          }
          poppedValues.push(poppedValue);
        }
        expect(poppedValues).toEqual(values.sort(compareFunction));
      },
    ),
  );
});
