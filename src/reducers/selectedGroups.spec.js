import selectedGroups from "./selectedGroups";

const groupKey = "1";

describe("entities reducer", () => {
  it("should handle initial state", () => {
    expect(selectedGroups(undefined, {})).toEqual({
      aggregate: [],
      individual: []
    });
  });

  it("should handle ADD_AGG_GROUP", () => {
    expect(
      selectedGroups({ aggregate: [] }, { type: "ADD_AGG_GROUP", groupKey })
    ).toEqual({ aggregate: [groupKey] });
  });

  it("should handle REMOVE_AGG_GROUP", () => {
    expect(
      selectedGroups(
        { aggregate: [groupKey, "bogus_key"] },
        {
          type: "REMOVE_AGG_GROUP",
          groupKey
        }
      )
    ).toEqual({ aggregate: ["bogus_key"] });
  });
});
