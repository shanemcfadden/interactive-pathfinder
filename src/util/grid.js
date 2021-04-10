export const mapGrid = (grid, mapFn) => {
  return grid.map((row) => row.map(mapFn));
};

export const shallowCopyOfGrid = (grid) => {
  return grid.map((row) => [...row]);
};
