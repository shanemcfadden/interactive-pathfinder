/**
 *
 * @param {Grid} grid
 * @param {MapFunction} mapFn
 * @returns {Grid}
 */
export const mapGrid = (grid, mapFn) => {
  return grid.map((row) => row.map(mapFn));
};

/**
 *
 * @param {Grid} grid
 * @returns {Grid}
 */
export const shallowCopyOfGrid = (grid) => {
  return grid.map((row) => [...row]);
};

/**
 * @typedef {Array<Array<any>>} Grid
 */
/**
 * @callback MapFunction
 * @param {*} value
 * @param {number} index
 * @param {Array.<any>} array
 * @param {*} [thisArg]
 * @returns {*}
 */
