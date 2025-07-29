export const Path = {
  Unvisited: 0,
  Visited: 1,
  Path: 2,
};

export type PathValue = ValueOf<typeof Path>;

type ValueOf<T> = T[keyof T];
