/**
 *
 * @param {Coordinate} coor1
 * @param {Coordinate} coor2
 * @returns {boolean}
 */
export const coordinatesAreEqual = (coor1, coor2) => {
  return JSON.stringify(coor1) === JSON.stringify(coor2);
};

/**
 *
 * @param {Array.<any>} arr
 * @returns {Array.<any> | undefined}
 */
export const getShallowCopyIfDefined = (arr) => {
  return arr ? [...arr] : undefined;
};

/**
 * @typedef {[number, number]} Coordinate
 */
