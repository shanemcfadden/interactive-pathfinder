export const coordinatesAreEqual = (coor1, coor2) => {
  return JSON.stringify(coor1) === JSON.stringify(coor2);
};

export const shallowCopyOfGrid = (grid) => {
  return grid.map((row) => [...row]);
};
