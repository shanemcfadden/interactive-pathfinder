import type { ValueOf } from "../types";

export const Path = {
  Unvisited: 0,
  Visited: 1,
  Path: 2,
};

export type PathValue = ValueOf<typeof Path>;
