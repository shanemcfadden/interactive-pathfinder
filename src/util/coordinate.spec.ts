import { describe, expect, it } from "vitest";
import fc from "fast-check";
import { areCoordinatesEqual } from "./coordinate";

describe("areCoordinatesEqual", () => {
  it("yields true for identical coordinates", () => {
    fc.assert(
      fc.property(fc.integer(), fc.integer(), (x, y) => {
        const result = areCoordinatesEqual([x, y], [x, y]);
        expect(result).toBe(true);
      }),
    );
  });
  it("yields false for different x values", () => {
    fc.assert(
      fc.property(fc.integer(), fc.integer(), fc.integer(), (x1, x2, y) => {
        fc.pre(x1 !== x2);
        const result = areCoordinatesEqual([x1, y], [x2, y]);
        expect(result).toBe(false);
      }),
    );
  });
  it("yields false for different y values", () => {
    fc.assert(
      fc.property(fc.integer(), fc.integer(), fc.integer(), (x, y1, y2) => {
        fc.pre(y1 !== y2);
        const result = areCoordinatesEqual([x, y1], [x, y2]);
        expect(result).toBe(false);
      }),
    );
  });
  it("yields false for different coordinates", () => {
    fc.assert(
      fc.property(
        fc.integer(),
        fc.integer(),
        fc.integer(),
        fc.integer(),
        (x1, y1, x2, y2) => {
          fc.pre(x1 !== x2 || y1 !== y2);
          const result = areCoordinatesEqual([x1, y1], [x2, y2]);
          expect(result).toBe(false);
        },
      ),
    );
  });
});
