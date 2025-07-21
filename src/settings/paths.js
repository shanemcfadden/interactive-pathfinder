import { flipKeyValuePairs } from '../util/obj';

export const PATHS_VALUE_NAME_MAP = {
  1: 'visited',
  2: 'path',
  3: 'start',
  4: 'end',
};

export const PATHS_NAME_VALUE_MAP = flipKeyValuePairs(PATHS_VALUE_NAME_MAP);
