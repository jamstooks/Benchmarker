import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import * as actions from "./search";
import fetchMock from "fetch-mock";

const middleware = [thunk];
const mockStore = configureMockStore(middleware);

describe("async actions", () => {
  afterEach(() => {
    fetchMock.reset();
    fetchMock.restore();
  });

  it("startSearch should create START_SEARCH action", () => {
    expect(actions.startSearch()).toEqual({
      type: "START_SEARCH"
    });
  });

  it("runSearch creates RECEIVE_SEARCH", () => {
    fetchMock.get("/bins/1a9tzi", {
      institutions: [{ id: 1, name: "college" }, { id: 2, name: "university" }],
      headers: { "content-type": "application/json" }
    });

    const expectedActions = [
      { type: "START_SEARCH", filters: [{ key: "val" }] },
      {
        type: "RECEIVE_SEARCH",
        institutions: [
          { id: 1, name: "college" },
          { id: 2, name: "university" }
        ]
      }
    ];
    const store = mockStore({ searchResults: {} });

    return store.dispatch(actions.runSearch([{ key: "val" }])).then(() => {
      expect(store.getActions()[0]).toEqual(expectedActions[0]);
      expect(store.getActions()[1].institutions).toEqual(
        expectedActions[0].institutions
      );
    });
  });
});
