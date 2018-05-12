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
          availableVersions: [{ id: 1, name: "1.2" }]
        }
      })
    ).toEqual([
      {
        type: "INSTITUTION",
        name: "University of Elsewhere",
        id: 1,
        selectedVersions: [],
        availableVersions: [{ id: 1, name: "1.2" }]
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
            selectedVersions: [],
            availableVersions: [{ id: 1, name: "1.2" }]
          }
        ],
        {
          type: "REMOVE_ENTITY",
          entityID: 1
        }
      )
    ).toEqual([]);
  });

  it("should handle TOGGLE_VERSION", () => {
    expect(
      entities(
        [
          {
            type: "INSTITUTION",
            name: "University of Elsewhere",
            id: 1,
            selectedVersions: [2, 3],
            availableVersions: [
              { id: 1, name: "1.2" },
              { id: 2, name: "2.0" },
              { id: 3, name: "2.1" }
            ]
          }
        ],
        {
          type: "TOGGLE_VERSION",
          entityID: 1,
          versionID: 1
        }
      )
    ).toEqual([
      {
        type: "INSTITUTION",
        name: "University of Elsewhere",
        id: 1,
        selectedVersions: [2, 3, 1],
        availableVersions: [
          { id: 1, name: "1.2" },
          { id: 2, name: "2.0" },
          { id: 3, name: "2.1" }
        ]
      }
    ]);

    expect(
      entities(
        [
          {
            type: "INSTITUTION",
            name: "University of Elsewhere",
            id: 1,
            selectedVersions: [2, 3],
            availableVersions: [
              { id: 1, name: "1.2" },
              { id: 2, name: "2.0" },
              { id: 3, name: "2.1" }
            ]
          }
        ],
        {
          type: "TOGGLE_VERSION",
          entityID: 1,
          versionID: 2
        }
      )
    ).toEqual([
      {
        type: "INSTITUTION",
        name: "University of Elsewhere",
        id: 1,
        selectedVersions: [3],
        availableVersions: [
          { id: 1, name: "1.2" },
          { id: 2, name: "2.0" },
          { id: 3, name: "2.1" }
        ]
      }
    ]);
  });
});
