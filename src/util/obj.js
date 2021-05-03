/**
 *
 * @param {Object.<string, any>} obj
 * @returns {Object.<string, any>}
 */
export const flipKeyValuePairs = (obj) => {
  return Object.keys(obj).reduce((map, oldKey) => {
    const newKey = obj[oldKey];
    map[newKey] = isNaN(oldKey) ? oldKey : +oldKey;
    return map;
  }, {});
};

// TODO: ADD descriptions of JSDOC definitions across util, dijkstra, and MinHeap
