import searchFilters from "./searchFilters";

describe("search filters reducer", () => {
  it("should handle initial state", () => {
    expect(searchFilters(undefined, [])).toEqual({});
  });

  it("should handle UPDATE_SEARCH_FILTER", () => {
    expect(
      searchFilters(
        { one: 1, two: 2 },
        {
          type: "UPDATE_SEARCH_FILTER",
          filter: {
            one: 3
          }
        }
      )
    ).toEqual({ one: 3, two: 2 });
  });
});
