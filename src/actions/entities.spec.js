import * as actions from "./entities";

describe("entity actions", () => {
  it("addEntity should create ADD_ENTITY action", () => {
    expect(
      actions.addEntity({
        type: "INSTITUTION",
        name: "University of Elsewhere",
        id: 1,
        availableVersions: [{ id: 1, name: "2.0" }]
      })
    ).toEqual({
      type: "ADD_ENTITY",
      entity: {
        type: "INSTITUTION",
        name: "University of Elsewhere",
        id: 1,
        availableVersions: [{ id: 1, name: "2.0" }]
      }
    });
  });

  it("removeEntity should create REMOVE_ENTITY action", () => {
    expect(actions.removeEntity(1)).toEqual({
      type: "REMOVE_ENTITY",
      entityID: 1
    });
  });

  it("toggleVersion should create TOGGLE_VERSION action", () => {
    expect(actions.toggleVersion(1, 1)).toEqual({
      type: "TOGGLE_VERSION",
      entityID: 1,
      versionID: 1
    });
  });
});
