/**
 * Takes an object and returns a new object whose key-value pairs are flipped
 * versions of the first object. All old values are converted to strings to
 * become keys in the new object. Any old keys that are stringified numbers
 * become new values with the type of number.
 * @param {Object.<string, any>} obj Initial object
 * @returns {Object.<string, any>} Flipped object
 */
export const flipKeyValuePairs = (obj) => {
  return Object.keys(obj).reduce((map, oldKey) => {
    const newKey = obj[oldKey];
    map[newKey] = isNaN(oldKey) ? oldKey : +oldKey;
    return map;
  }, {});
};
