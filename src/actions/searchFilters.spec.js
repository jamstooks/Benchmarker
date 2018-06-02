import fetchMock from "fetch-mock";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";

const middleware = [thunk];
const mockStore = configureMockStore(middleware);

import * as actions from "./searchFilters";

describe("search filter actions", () => {
  it("updateSearchFilter should create UPDATE_SEARCH_FILTER action", () => {
    expect(actions.updateSearchFilter({ key: "value" })).toEqual({
      type: "UPDATE_SEARCH_FILTER",
      filter: { key: "value" }
    });
  });

  it("resetSearchFilters should create RESET_SEARCH_FILTERS action", () => {
    expect(actions.resetSearchFilters()).toEqual({
      type: "RESET_SEARCH_FILTERS"
    });
  });

  it("startFetchSearchFilters should create START_FETCH_SEARCH_FILTERS action", () => {
    expect(actions.startFetchSearchFilters()).toEqual({
      type: "START_FETCH_SEARCH_FILTERS"
    });
  });

  it("receiveFetchSearchFilters should create RECEIVE_FETCH_SEARCH_FILTERS action", () => {
    expect(actions.receiveFetchSearchFilters([{ key: "value" }])).toEqual({
      type: "RECEIVE_FETCH_SEARCH_FILTERS",
      filters: [{ key: "value" }]
    });
  });

  it("fetchSearchFilters creates START_FETCH_SEARCH_FILTERS and RECEIVE_FETCH_SEARCH_FILTERS", () => {
    let tempFilters = [
      {
        key: "k1",
        title: "K1",
        choices: {
          list: [
            { value: "", title: "Select One" },
            { value: "Gold", title: "Gold" }
          ]
        }
      }
    ];

    fetchMock.get("*", tempFilters);

    const expectedActions = [
      { type: "START_FETCH_SEARCH_FILTERS" },
      {
        type: "RECEIVE_FETCH_SEARCH_FILTERS",
        filters: tempFilters
      }
    ];
    const store = mockStore({ searchResults: {} });

    return store.dispatch(actions.fetchSearchFilters()).then(() => {
      expect(store.getActions()[0]).toEqual(expectedActions[0]);
      expect(store.getActions()[1]).toEqual(expectedActions[1]);
    });
  });
});
