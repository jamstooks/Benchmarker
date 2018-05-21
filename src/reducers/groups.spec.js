import groups from "./groups";

describe("search reducer", () => {
  it("should handle initial state", () => {
    expect(groups(undefined, [])).toEqual({
      isFetching: false,
      didInvalidate: false,
      groups: []
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
          {},
          {
            type: "START_REQUEST_ALL_GROUPS"
          }
        )
      ).toEqual({
        isFetching: true,
        didInvalidate: false,
        groups: [],
        lastUpdated: null
      });
    });
  });

  it("should handle RECIEVE_ALL_GROUPS", () => {
    expect(
      groups(
        {},
        {
          type: "RECIEVE_ALL_GROUPS",
          groups: [
            { id: 1, name: "universities", entities: [] },
            { id: 2, name: "colleges", entities: [] }
          ],
          receivedAt: 123
        }
      )
    ).toEqual({
      isFetching: false,
      didInvalidate: false,
      groups: [
        { id: 1, name: "universities", entities: [] },
        { id: 2, name: "colleges", entities: [] }
      ],
      lastUpdated: 123
    });
  });
});
