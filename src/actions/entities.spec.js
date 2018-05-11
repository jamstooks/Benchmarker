import * as actions from "./entities";

describe("entity actions", () => {
  it("addEntity should create ADD_ENTITY action", () => {
    expect(actions.addEntity({ name: "entity" })).toEqual({
      type: "ADD_ENTITY",
      entity: { name: "entity" }
    });
  });

  it("removeEntity should create REMOVE_ENTITY action", () => {
    expect(actions.removeEntity(1)).toEqual({
      type: "REMOVE_ENTITY",
      id: 1
    });
  });
});
