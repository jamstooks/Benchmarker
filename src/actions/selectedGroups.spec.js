import * as actions from "./selectedGroups";

describe("selectedGroups actions", () => {
  it("addAggGroup should create ADD_GROUP action", () => {
    let groupKey = "1";
    expect(actions.addAggGroup(groupKey)).toEqual({
      type: "ADD_AGG_GROUP",
      groupKey
    });
  });

  it("removeAggGroup should create REMOVE_GROUP action", () => {
    let groupKey = "1";
    expect(actions.removeAggGroup(groupKey)).toEqual({
      type: "REMOVE_AGG_GROUP",
      groupKey
    });
  });
});
