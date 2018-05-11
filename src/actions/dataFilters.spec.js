import * as actions from "./dataFilters";

describe("data filter actions", () => {
  it("addDataFilter should create ADD_DATA_FILTER action", () => {
    expect(actions.addDataFilter({ name: "filter" })).toEqual({
      type: "ADD_DATA_FILTER",
      filter: { name: "filter" }
    });
  });

  it("removeDataFilter should create REMOVE_DATA_FILTER action", () => {
    expect(actions.removeDataFilter("key")).toEqual({
      type: "REMOVE_DATA_FILTER",
      key: "key"
    });
  });
});
