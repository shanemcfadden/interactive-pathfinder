/**
 * Determines whether given coordinates have matching values in each index
 * @param {Coordinate} coor1
 * @param {Coordinate} coor2
 * @returns {boolean}
 */
export const coordinatesAreEqual = (coor1, coor2) => {
  return JSON.stringify(coor1) === JSON.stringify(coor2);
};

/**
 * Returns a shallow copy of a given array if it is not undefined
 * @param {Array.<any>} arr
 * @returns {Array.<any> | undefined}
 */
export const getShallowCopyIfDefined = (arr) => {
  return arr ? [...arr] : undefined;
};

/**
 * @typedef {[number, number]} Coordinate
 */
