import search from "./search";

describe("search reducer", () => {
  it("should handle initial state", () => {
    expect(search(undefined, [])).toEqual({
      isFetching: false,
      didInvalidate: false,
      entities: []
    });
  });

  it("should handle RECEIVE_SEARCH", () => {
    expect(
      search(
        {},
        {
          type: "RECEIVE_SEARCH",
          results: [{ id: 1, name: "university" }, { id: 2, name: "college" }],
          receivedAt: 123
        }
      )
    ).toEqual({
      isFetching: false,
      didInvalidate: false,
      entities: [{ id: 1, name: "university" }, { id: 2, name: "college" }],
      lastUpdated: 123
    });
  });
});
