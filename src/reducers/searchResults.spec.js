import searchResults from "./searchResults";

describe("search reducer", () => {
  it("should handle initial state", () => {
    expect(searchResults(undefined, [])).toEqual({
      isFetching: false,
      entities: []
    });
  });

  it("should handle RECEIVE_SEARCH", () => {
    expect(
      searchResults(
        {},
        {
          type: "RECEIVE_SEARCH",
          results: [{ id: 1, name: "university" }, { id: 2, name: "college" }],
          receivedAt: 123
        }
      )
    ).toEqual({
      isFetching: false,
      entities: [{ id: 1, name: "university" }, { id: 2, name: "college" }],
      lastUpdated: 123
    });
  });
});
