import datafilters from "./dataFilters";

describe("datafilters reducer", () => {
  it("should handle initial state", () => {
    expect(datafilters(undefined, [])).toEqual([]);
  });

  it("should handle ADD_DATA_FILTER", () => {
    expect(
      datafilters([], {
        type: "ADD_DATA_FILTER",
        filter: {
          name: "filter",
          key: "key"
        }
      })
    ).toEqual([
      {
        name: "filter",
        key: "key"
      }
    ]);
  });

  it("should handle REMOVE_DATA_FILTER", () => {
    expect(
      datafilters(
        [
          {
            name: "filter",
            key: "key"
          }
        ],
        {
          type: "REMOVE_DATA_FILTER",
          key: "key"
        }
      )
    ).toEqual([]);
  });
});
