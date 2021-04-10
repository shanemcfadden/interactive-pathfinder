export const mapGrid = (grid, mapFn) => {
  return grid.map((row) => row.map(mapFn));
};
