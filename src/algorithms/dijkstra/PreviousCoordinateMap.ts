import type { Coordinate } from '../../util/coordinate';

export class PreviousCoordinateMap {
  private map: Record<string, Coordinate | null>;

  constructor() {
    this.map = {};
  }

  public setPreviousCoordinate(
    coordinate: Coordinate,
    previousCoordinate: Coordinate | null,
  ): void {
    this.map[this.coordinateToKey(coordinate)] = previousCoordinate;
  }

  public getPreviousCoordinate(
    coordinate: Coordinate,
  ): Coordinate | null | undefined {
    return this.map[this.coordinateToKey(coordinate)];
  }

  public hasCoordinateBeenVisited(coordinate: Coordinate): boolean {
    return Object.hasOwn(this.map, this.coordinateToKey(coordinate));
  }

  public getPathToEnd(endingCoordinate: Coordinate): Coordinate[] {
    const path: Coordinate[] = [];
    let current: Coordinate | null | undefined = endingCoordinate;

    while (current) {
      path.push(current);
      current = this.getPreviousCoordinate(current);
    }

    return path.reverse();
  }

  private coordinateToKey(coordinate: Coordinate): string {
    return JSON.stringify(coordinate);
  }
}
