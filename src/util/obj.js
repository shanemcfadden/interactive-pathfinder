export const flipKeyValuePairs = (obj) => {
  return Object.keys(obj).reduce((map, oldKey) => {
    const newKey = obj[oldKey];
    map[newKey] = isNaN(oldKey) ? oldKey : +oldKey;
    return map;
  }, {});
};
