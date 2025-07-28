import type { Coordinate } from './arr';

export class Grid<T> {
  private _values: T[][];

  constructor(_values: T[][]) {
    this._values = _values.map((row) => [...row]);
  }

  public get values(): T[][] {
    return this._values;
  }

  public shallowCopyOfGrid(): Grid<T> {
    return new Grid(this._values);
  }

  public setCoordinate(coordinate: Coordinate, value: T): void {
    if (!this.isValidCoordinate(coordinate)) {
      throw new Error(
        `Invalid coordinate: ${JSON.stringify(coordinate)}. Grid size: ${this._values.length}x${this._values[0].length}`,
      );
    }
    this._values[coordinate[0]][coordinate[1]] = value;
  }

  public getCoordinate(coordinate: Coordinate): T {
    if (!this.isValidCoordinate(coordinate)) {
      throw new Error(
        `Invalid coordinate: ${JSON.stringify(coordinate)}. Grid size: ${this._values.length}x${this._values[0].length}`,
      );
    }
    return this._values[coordinate[0]][coordinate[1]];
  }

  public flatMap<U>(
    flatMapFunction: (element: T, coordinate: Coordinate) => U | U[],
  ): U[] {
    return this._values.flatMap((row, i) =>
      row.flatMap((element, j) => flatMapFunction(element, [i, j])),
    );
  }
  public map<U>(mapFunction: (element: T, coordinate: Coordinate) => U) {
    return new Grid(
      this._values.map((row, i) =>
        row.map((element, j) => mapFunction(element, [i, j])),
      ),
    );
  }

  public getNeighboringCoordinates([a, b]: Coordinate): Coordinate[] {
    const possibleNeighbors: Coordinate[] = [
      [a - 1, b],
      [a, b - 1],
      [a + 1, b],
      [a, b + 1],
    ];

    return possibleNeighbors.filter((coordinate) =>
      this.isValidCoordinate(coordinate),
    );
  }

  private isValidCoordinate([a, b]: Coordinate): boolean {
    return (
      a >= 0 && a < this._values.length && b >= 0 && b < this._values[a].length
    );
  }

  public findCoordinate(
    findFn: (element: T, coordinate: Coordinate) => boolean,
  ): Coordinate | undefined {
    for (let i = 0; i < this._values.length; i++) {
      for (let j = 0; j < this._values[i].length; j++) {
        if (findFn(this._values[i][j], [i, j])) {
          return [i, j];
        }
      }
    }
  }
}
