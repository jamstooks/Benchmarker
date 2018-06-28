import groups from "./groups";
import cookie from "react-cookies";

let oldCookie = cookie.load("savedGroups");

describe("search reducer", () => {
  beforeEach(() => {
    cookie.save("savedGroups", []);
  });
  afterEach(() => {
    cookie.save("savedGroups", oldCookie);
  });

  it("should handle initial state", () => {
    expect(groups(undefined, [])).toEqual({
      isFetching: false,
      available: [],
      beingRenamed: []
    });
  });

  it("should handle START_REQUEST_RENAME_GROUP ", () => {
    expect(
      groups(
        {
          isFetching: false,
          available: [{ key: 1, name: "universities", entities: [] }],
          lastUpdated: 123,
          beingRenamed: []
        },
        {
          type: "START_REQUEST_RENAME_GROUP",
          groupKey: 1
        }
      )
    ).toEqual({
      isFetching: false,
      available: [{ key: 1, name: "universities", entities: [] }],
      lastUpdated: 123,
      beingRenamed: [1]
    });
  });

  it("should handle RECEIVE_RENAMED_GROUP ", () => {
    expect(
      groups(
        {
          isFetching: false,
          available: [{ key: 1, name: "universities", entities: [] }],
          lastUpdated: 123,
          beingRenamed: [1]
        },
        {
          type: "RECEIVE_RENAMED_GROUP",
          groupKey: 1
        }
      )
    ).toEqual({
      isFetching: false,
      available: [{ key: 1, name: "universities", entities: [] }],
      lastUpdated: 123,
      beingRenamed: []
    });
  });

  it("should handle START_REQUEST_ALL_GROUPS and REQUEST_NEW_ADHOC_GROUP and DELETE_ADHOC_GROUP", () => {
    let types = [
      "START_REQUEST_ALL_GROUPS",
      "REQUEST_NEW_ADHOC_GROUP",
      "DELETE_ADHOC_GROUP"
    ];
    types.forEach(() => {
      expect(
        groups(
          {
            isFetching: false,
            available: [],
            lastUpdated: 123,
            beingRenamed: []
          },
          {
            type: "START_REQUEST_ALL_GROUPS"
          }
        )
      ).toEqual({
        isFetching: true,
        available: [],
        lastUpdated: null,
        beingRenamed: []
      });
    });
  });

  it("should handle RECEIVE_ALL_GROUPS", () => {
    expect(
      groups(
        {
          isFetching: true,
          available: [],
          lastUpdated: null,
          beingRenamed: []
        },
        {
          type: "RECEIVE_ALL_GROUPS",
          groups: [
            { id: 1, name: "universities", entities: [] },
            { id: 2, name: "colleges", entities: [] }
          ],
          receivedAt: 123
        }
      )
    ).toEqual({
      isFetching: false,
      available: [
        { id: 1, name: "universities", entities: [] },
        { id: 2, name: "colleges", entities: [] }
      ],
      lastUpdated: 123,
      beingRenamed: []
    });
  });
});
