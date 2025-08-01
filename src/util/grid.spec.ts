import { describe, expect, it } from 'vitest';
import fc from 'fast-check';
import { Grid } from './grid';
import { areCoordinatesEqual } from './coordinate';

const mockGridHeight = 8;
const mockGridWidth = 10;

const arrayToGrid = (array: number[]) => {
  if (array.length !== mockGridHeight * mockGridWidth) {
    throw new Error(
      `Array length must be ${mockGridHeight * mockGridWidth}, but got ${array.length}`,
    );
  }

  return new Grid(
    array.reduce<number[][]>((acc, value, index) => {
      const rowIndex = Math.floor(index / mockGridWidth);
      if (!acc[rowIndex]) {
        acc[rowIndex] = [];
      }
      acc[rowIndex].push(value);
      return acc;
    }, []),
  );
};

describe('findCoordinate', () => {
  it('returns the coordinate of the only element that matches the condition', () => {
    fc.assert(
      fc.property(
        fc.uniqueArray(fc.integer(), {
          minLength: mockGridHeight * mockGridWidth,
          maxLength: mockGridHeight * mockGridWidth,
        }),
        fc.integer({ min: 0, max: mockGridHeight * mockGridWidth - 1 }),
        (values, elementIndex) => {
          const elementToFind = values[elementIndex];

          const grid = arrayToGrid(values);
          const coordinate = grid.findCoordinate(
            (element) => element === elementToFind,
          );

          expect(coordinate).toEqual([
            Math.floor(elementIndex / mockGridWidth),
            elementIndex % mockGridWidth,
          ]);
        },
      ),
    );
  });
  it('returns the coordinate of the first element that matches the condition', () => {
    fc.assert(
      fc.property(
        fc.array(fc.integer(), {
          minLength: mockGridHeight * mockGridWidth,
          maxLength: mockGridHeight * mockGridWidth,
        }),
        (values) => {
          const grid = arrayToGrid(values);

          for (let i = 0; i < values.length; i++) {
            const elementToFind = values[i];
            const firstIndexOfElement = values.indexOf(elementToFind);

            const firstCoordinateOfElement = grid.findCoordinate(
              (element) => element === elementToFind,
            );

            expect(firstCoordinateOfElement).toEqual([
              Math.floor(firstIndexOfElement / mockGridWidth),
              firstIndexOfElement % mockGridWidth,
            ]);
          }
        },
      ),
    );
  });
  it('returns undefined if no element matches the condition', () => {
    fc.assert(
      fc.property(
        fc.uniqueArray(fc.integer(), {
          minLength: mockGridHeight * mockGridWidth + 1,
          maxLength: mockGridHeight * mockGridWidth + 1,
        }),
        (values) => {
          const [nonMatchingElement, ...gridValues] = values;
          const grid = arrayToGrid(gridValues);

          const coordinate = grid.findCoordinate(
            (element) => element === nonMatchingElement,
          );
          expect(coordinate).toBeUndefined();
        },
      ),
    );
  });
});

describe('flatMap', () => {
  it('flattens the grid and applies the mapping function to each element', () => {
    fc.assert(
      fc.property(
        fc.array(fc.integer(), {
          minLength: mockGridHeight * mockGridWidth,
          maxLength: mockGridHeight * mockGridWidth,
        }),
        (values) => {
          const flatMapFunction = (value: number) => [value, value * 2];

          const grid = arrayToGrid(values);
          const flattenedValues = grid.flatMap(flatMapFunction);

          const expectedValues = values.flatMap(flatMapFunction);
          expect(flattenedValues).toEqual(expectedValues);
        },
      ),
    );
  });
});

describe('getCoordinate', () => {
  it('returns the value at the specified coordinate', () => {
    fc.assert(
      fc.property(
        fc.array(fc.integer(), {
          minLength: mockGridHeight * mockGridWidth,
          maxLength: mockGridHeight * mockGridWidth,
        }),
        fc.integer({ min: 0, max: mockGridHeight - 1 }),
        fc.integer({ min: 0, max: mockGridWidth - 1 }),
        (values, row, column) => {
          const grid = arrayToGrid(values);

          const value = grid.getCoordinate([row, column]);
          expect(value).toBe(values[row * mockGridWidth + column]);
        },
      ),
    );
  });
  it('throws an error for out of range integers', () => {
    fc.assert(
      fc.property(fc.integer(), fc.integer(), (row, column) => {
        fc.pre(
          row < 0 ||
            row >= mockGridHeight ||
            column < 0 ||
            column >= mockGridWidth,
        );

        const grid = new Grid<number>(
          Array.from({ length: mockGridHeight }, () =>
            Array(mockGridWidth).fill(0),
          ),
        );

        expect(() => grid.getCoordinate([row, column])).toThrow();
      }),
    );
  });
  it('throws an error for non-integer numbers', () => {
    fc.assert(
      fc.property(fc.float(), fc.float(), (row, column) => {
        fc.pre(!Number.isInteger(row) || !Number.isInteger(column));

        const grid = new Grid<number>(
          Array.from({ length: mockGridHeight }, () =>
            Array(mockGridWidth).fill(0),
          ),
        );

        expect(() => grid.getCoordinate([row, column])).toThrow();
      }),
    );
  });
});

describe('getNeighboringCoordinates', () => {
  it('yields neighboring upper coordinate if it exists', () => {
    fc.assert(
      fc.property(
        fc.integer({ min: 1, max: mockGridHeight - 1 }),
        fc.integer({ min: 0, max: mockGridWidth - 1 }),
        (row, column) => {
          const grid = new Grid<number>(
            Array.from({ length: mockGridHeight }, () =>
              Array(mockGridWidth).fill(0),
            ),
          );

          const neighbors = grid.getNeighboringCoordinates([row, column]);

          expect(
            neighbors.some((coordinate) =>
              areCoordinatesEqual(coordinate, [row - 1, column]),
            ),
          ).toBe(true);
        },
      ),
    );
  });
  it('yields neighboring left coordinate if it exists', () => {
    fc.assert(
      fc.property(
        fc.integer({ min: 0, max: mockGridHeight - 1 }),
        fc.integer({ min: 1, max: mockGridWidth - 1 }),
        (row, column) => {
          const grid = new Grid<number>(
            Array.from({ length: mockGridHeight }, () =>
              Array(mockGridWidth).fill(0),
            ),
          );

          const neighbors = grid.getNeighboringCoordinates([row, column]);

          expect(
            neighbors.some((coordinate) =>
              areCoordinatesEqual(coordinate, [row, column - 1]),
            ),
          ).toBe(true);
        },
      ),
    );
  });
  it('yields neighboring lower coordinate if it exists', () => {
    fc.assert(
      fc.property(
        fc.integer({ min: 0, max: mockGridHeight - 2 }),
        fc.integer({ min: 0, max: mockGridWidth - 1 }),
        (row, column) => {
          const grid = new Grid<number>(
            Array.from({ length: mockGridHeight }, () =>
              Array(mockGridWidth).fill(0),
            ),
          );

          const neighbors = grid.getNeighboringCoordinates([row, column]);

          expect(
            neighbors.some((coordinate) =>
              areCoordinatesEqual(coordinate, [row + 1, column]),
            ),
          ).toBe(true);
        },
      ),
    );
  });
  it('yields neighboring right coordinate if it exists', () => {
    fc.assert(
      fc.property(
        fc.integer({ min: 0, max: mockGridHeight - 1 }),
        fc.integer({ min: 0, max: mockGridWidth - 2 }),
        (row, column) => {
          const grid = new Grid<number>(
            Array.from({ length: mockGridHeight }, () =>
              Array(mockGridWidth).fill(0),
            ),
          );

          const neighbors = grid.getNeighboringCoordinates([row, column]);

          expect(
            neighbors.some((coordinate) =>
              areCoordinatesEqual(coordinate, [row, column + 1]),
            ),
          ).toBe(true);
        },
      ),
    );
  });
  it('does not yield upper coordinate for first row', () => {
    fc.assert(
      fc.property(fc.integer({ min: 0, max: mockGridWidth - 1 }), (column) => {
        const grid = new Grid<number>(
          Array.from({ length: mockGridHeight }, () =>
            Array(mockGridWidth).fill(0),
          ),
        );

        const neighbors = grid.getNeighboringCoordinates([0, column]);

        expect(
          neighbors.some((coordinate) =>
            areCoordinatesEqual(coordinate, [-1, column]),
          ),
        ).toBe(false);
      }),
    );
  });
  it('does not yield left coordinate for first column', () => {
    fc.assert(
      fc.property(fc.integer({ min: 0, max: mockGridHeight - 1 }), (row) => {
        const grid = new Grid<number>(
          Array.from({ length: mockGridHeight }, () =>
            Array(mockGridWidth).fill(0),
          ),
        );

        const neighbors = grid.getNeighboringCoordinates([row, 0]);

        expect(
          neighbors.some((coordinate) =>
            areCoordinatesEqual(coordinate, [row, -1]),
          ),
        ).toBe(false);
      }),
    );
  });
  it('does not yield lower coordinate for last row', () => {
    fc.assert(
      fc.property(fc.integer({ min: 0, max: mockGridWidth - 1 }), (column) => {
        const grid = new Grid<number>(
          Array.from({ length: mockGridHeight }, () =>
            Array(mockGridWidth).fill(0),
          ),
        );

        const neighbors = grid.getNeighboringCoordinates([
          mockGridHeight - 1,
          column,
        ]);

        expect(
          neighbors.some((coordinate) =>
            areCoordinatesEqual(coordinate, [mockGridHeight, column]),
          ),
        ).toBe(false);
      }),
    );
  });
  it('does not yield right coordinate for last column', () => {
    fc.assert(
      fc.property(fc.integer({ min: 0, max: mockGridHeight - 1 }), (row) => {
        const grid = new Grid<number>(
          Array.from({ length: mockGridHeight }, () =>
            Array(mockGridWidth).fill(0),
          ),
        );

        const neighbors = grid.getNeighboringCoordinates([
          row,
          mockGridWidth - 1,
        ]);

        expect(
          neighbors.some((coordinate) =>
            areCoordinatesEqual(coordinate, [row, mockGridWidth]),
          ),
        ).toBe(false);
      }),
    );
  });
});

describe('map', () => {
  it('applies the mapping function to each element', () => {
    fc.assert(
      fc.property(
        fc.array(fc.integer(), {
          minLength: mockGridHeight * mockGridWidth,
          maxLength: mockGridHeight * mockGridWidth,
        }),
        (values) => {
          const mapper = (value: number) => value * 2;

          const grid = arrayToGrid(values);
          const mappedGrid = grid.map(mapper);

          const expectedValues = values.map(mapper);
          const expectedGrid = arrayToGrid(expectedValues);

          expect(mappedGrid).toEqual(expectedGrid);
        },
      ),
    );
  });
});

describe('setCoordinate', () => {
  it('sets the value at the specified coordinate', () => {
    fc.assert(
      fc.property(
        fc.array(fc.integer(), {
          minLength: mockGridHeight * mockGridWidth,
          maxLength: mockGridHeight * mockGridWidth,
        }),
        fc.integer({ min: 0, max: mockGridHeight - 1 }),
        fc.integer({ min: 0, max: mockGridWidth - 1 }),
        fc.integer(),
        (values, row, column, newValue) => {
          const grid = arrayToGrid(values);
          grid.setCoordinate([row, column], newValue);

          expect(grid.getCoordinate([row, column])).toBe(newValue);
        },
      ),
    );
  });
});

describe('shallowCopy', () => {
  it('creates a shallow copy of the grid', () => {
    fc.assert(
      fc.property(
        fc.array(fc.integer(), {
          minLength: mockGridHeight * mockGridWidth,
          maxLength: mockGridHeight * mockGridWidth,
        }),
        (values) => {
          const grid = arrayToGrid(values);
          const copiedGrid = grid.shallowCopyOfGrid();

          expect(copiedGrid).toEqual(grid);
          expect(copiedGrid).not.toBe(grid); // Ensure it's a different instance
        },
      ),
    );
  });
});
