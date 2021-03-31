export const flipKeyValuePairs = (obj) => {
  return Object.keys(obj).reduce((map, value) => {
    const name = obj[value];
    map[name] = value;
    return map;
  }, {});
};
