import * as actions from "./searchFilters";

describe("search filter actions", () => {
  it("updateSearchFilter should create UPDATE_SEARCH_FILTER action", () => {
    expect(actions.updateSearchFilter({ key: "value" })).toEqual({
      type: "UPDATE_SEARCH_FILTER",
      filter: { key: "value" }
    });
  });

  it("resetSearchFilters should create RESET_SEARCH_FILTERS action", () => {
    expect(actions.resetSearchFilters()).toEqual({
      type: "RESET_SEARCH_FILTERS"
    });
  });
});
