import entities from "./entities";

describe("entities reducer", () => {
  it("should handle initial state", () => {
    expect(entities(undefined, {})).toEqual([]);
  });

  it("should handle ADD_ENTITY", () => {
    expect(
      entities([], {
        type: "ADD_ENTITY",
        entity: {
          type: "INSTITUTION",
          name: "University of Elsewhere",
          id: 1,
          selectedVersions: ["latest"]
        }
      })
    ).toEqual([
      {
        type: "INSTITUTION",
        name: "University of Elsewhere",
        id: 1,
        selectedVersions: ["latest"]
      }
    ]);
  });

  it("should handle REMOVE_ENTITY", () => {
    expect(
      entities(
        [
          {
            type: "INSTITUTION",
            name: "University of Elsewhere",
            id: 1,
            selectedVersions: ["latest"]
          }
        ],
        {
          type: "REMOVE_ENTITY",
          entity: { id: 1 }
        }
      )
    ).toEqual([]);
  });
});
