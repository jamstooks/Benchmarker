import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import fetchMock from "fetch-mock";

import * as actions from "./viewData";
import {
  mockEntities,
  mockDataFilters,
  mockSubmissionData
} from "../mockData/viewData.js";

const middleware = [thunk];
const mockStore = configureMockStore(middleware);

describe("viewData actions", () => {
  afterEach(() => {
    fetchMock.reset();
    fetchMock.restore();
  });

  it("startUpdateViewData should create START_UPDATE_VIEW_DATA action", () => {
    expect(actions.startUpdateViewData()).toEqual({
      type: "START_UPDATE_VIEW_DATA"
    });
  });

  it("receiveViewData should create RECEIVE_VIEW_DATA action", () => {
    expect(actions.receiveViewData({ columns: [], list: [] })).toEqual({
      type: "RECEIVE_VIEW_DATA",
      data: { columns: [], list: [] }
    });
  });

  it("startSortViewData should create START_SORT_VIEW_DATA action", () => {
    expect(actions.startSortViewData()).toEqual({
      type: "START_SORT_VIEW_DATA"
    });
  });

  it("fetchViewData should create START_UPDATE_VIEW_DATA and RECEIVE_VIEW_DATA", () => {
    fetchMock.get("*", mockSubmissionData);

    const expectedActions = [
      {
        type: "START_UPDATE_VIEW_DATA"
      },
      {
        type: "RECEIVE_VIEW_DATA",
        data: {}
      }
    ];
    const store = mockStore({
      isFetching: false,
      isSorting: false,
      items: {
        columns: [],
        list: []
      },
      sortColumn: null
    });

    return store
      .dispatch(actions.fetchViewData(mockEntities, mockDataFilters))
      .then(() => {
        expect(store.getActions()[0]).toEqual(expectedActions[0]);
        expect(store.getActions()[1].type).toEqual(expectedActions[1].type);
        expect(store.getActions()[1].data.list.length).toEqual(3);
        expect(Object.keys(store.getActions()[1].data.list[0])).toEqual([
          "entity",
          "sub_1",
          "overall"
        ]);
        expect(store.getActions()[1].data.columns).toEqual([
          { key: "entity", title: "Report", is_numeric: false, units: null },
          {
            key: "overall",
            title: "Overall Score",
            is_numeric: true,
            units: null
          },
          {
            key: "sub_1",
            title: "Co-Curricular Education",
            is_numeric: true,
            units: "%"
          }
        ]);
      });
  });
});
