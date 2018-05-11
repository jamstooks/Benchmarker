import * as actions from "./entities";

describe("entity actions", () => {
  it("addEntity should create ADD_ENTITY action", () => {
    expect(actions.addEntity({ id: 1, name: "entity" })).toEqual({
      type: "ADD_ENTITY",
      entity: { id: 1, name: "entity" }
    });
  });

  it("removeEntity should create REMOVE_ENTITY action", () => {
    expect(actions.removeEntity({ id: 1, name: "entity" })).toEqual({
      type: "REMOVE_ENTITY",
      entity: { id: 1, name: "entity" }
    });
  });
});
