import groups from "./groups";

describe("search reducer", () => {
  it("should handle initial state", () => {
    expect(groups(undefined, [])).toEqual({
      isFetching: false,
      didInvalidate: false,
      groups: []
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
