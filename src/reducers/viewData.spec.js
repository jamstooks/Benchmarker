import viewData from "./viewData";

let fakeItems = { columns: [1, 2], list: [1, 2] };

let baseState = {
  isFetching: false,
  isSorting: false,
  items: fakeItems,
  sortColumn: null
};

let fetchingState = { ...baseState, ...{ isFetching: true } };
let sortingState = { ...baseState, ...{ isSorting: true } };

describe("viewData reducer", () => {
  it("should handle initial state", () => {
    expect(viewData(undefined, [])).toEqual({
      isFetching: false,
      isSorting: false,
      items: { columns: [], list: [] },
      sortColumn: null
    });
  });

  it("should handle START_UPDATE_VIEW_DATA", () => {
    expect(
      viewData(baseState, { type: "START_UPDATE_VIEW_DATA" }).isFetching
    ).toEqual(true);
    expect(
      viewData(baseState, { type: "START_UPDATE_VIEW_DATA" }).items
    ).toEqual({ columns: [], list: [] });
  });

  it("should handle RECEIVE_VIEW_DATA", () => {
    expect(
      viewData(fetchingState, { type: "RECEIVE_VIEW_DATA", data: fakeItems })
        .items
    ).toEqual(fakeItems);
    expect(
      viewData(fetchingState, { type: "RECEIVE_VIEW_DATA", data: fakeItems })
        .isFetching
    ).toEqual(false);
    expect(
      viewData(sortingState, { type: "RECEIVE_VIEW_DATA", data: fakeItems })
        .isSorting
    ).toEqual(false);
    // @todo - handle sort_column on removal
  });

  it("should handle START_SORT_VIEW_DATA", () => {
    expect(
      viewData(baseState, { type: "START_SORT_VIEW_DATA", columnKey: "key" })
        .isSorting
    ).toEqual(true);
    expect(
      viewData(baseState, { type: "START_SORT_VIEW_DATA", columnKey: "key" })
        .sortColumn
    ).toEqual("key");
  });
});
