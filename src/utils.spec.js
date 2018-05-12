import { addOrRemove } from "./utils";

describe("add or remove utility", () => {
  it("should handle basic arrays", () => {
    expect(addOrRemove([1, 2], 4, (a, b) => a == b)).toEqual([1, 2, 4]);
    expect(addOrRemove([1, 2], 1, (a, b) => a == b)).toEqual([2]);
    expect(addOrRemove([], 3, (a, b) => a == b)).toEqual([3]);
    expect(addOrRemove([1], 1, (a, b) => a == b)).toEqual([]);
  });

  it("should handle arrays of objects", () => {
    expect(
      addOrRemove(
        [{ id: 1, name: "one" }, { id: 2, name: "two" }],
        { id: 4, name: "four" },
        (a, b) => a.id == b.id
      )
    ).toEqual([
      { id: 1, name: "one" },
      { id: 2, name: "two" },
      { id: 4, name: "four" }
    ]);

    expect(
      addOrRemove(
        [{ id: 1, name: "one" }, { id: 2, name: "two" }],
        { id: 1, name: "one" },
        (a, b) => a.id == b.id
      )
    ).toEqual([{ id: 2, name: "two" }]);
  });
});
