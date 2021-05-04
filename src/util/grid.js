/**
 * Similar to Array.prototype.map(), calls a function across every element
 * of a grid and returns a new grid.
 * @param {Grid} grid
 * @param {MapFunction} mapFn
 * @returns {Grid}
 */
export const mapGrid = (grid, mapFn) => {
  return grid.map((row) => row.map(mapFn));
};

/**
 * Returns a shallow copy of a given grid.
 * @param {Grid} grid Initial grid
 * @returns {Grid} Shallow copy of initial grid
 */
export const shallowCopyOfGrid = (grid) => {
  return grid.map((row) => [...row]);
};

/**
 * @typedef {Array<Array<any>>} Grid
 *
 * @callback MapFunction
 * @param {*} value
 * @param {number} index
 * @param {Array.<any>} array
 * @param {*} [thisArg]
 * @returns {*}
 */
