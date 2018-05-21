import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import fetchMock from "fetch-mock";

import * as actions from "./dataFilters";
import { initialDataFilters } from "../config.js";

const middleware = [thunk];
const mockStore = configureMockStore(middleware);

describe("data filter actions", () => {
  it("selectDataFilter should create SELECT_DATA_FILTER action", () => {
    expect(actions.selectDataFilter("category", 1)).toEqual({
      type: "SELECT_DATA_FILTER",
      key: "category",
      value: 1
    });
  });

  it("removeDataFilter should create REMOVE_DATA_FILTER action", () => {
    expect(actions.removeDataFilter("key")).toEqual({
      type: "REMOVE_DATA_FILTER",
      key: "key"
    });
  });

  it("startFilterUpdate should create START_FILTER_UPDATE action", () => {
    expect(actions.startFilterUpdate("subcategory", "category", "c1")).toEqual({
      type: "START_FILTER_UPDATE",
      key: "subcategory",
      parentKey: "category",
      parentValue: "c1"
    });
  });

  it("recieveFilterChoices should create SELECT_DARECIEVE_FILTER_CHOICESTA_FILTER action", () => {
    expect(
      actions.recieveFilterChoices("category", [
        { name: "cat1", id: 1 },
        { name: "cat2", id: 2 }
      ])
    ).toEqual({
      type: "RECIEVE_FILTER_CHOICES",
      key: "category",
      items: [{ name: "cat1", id: 1 }, { name: "cat2", id: 2 }]
    });
  });

  it("updateFilters on top-level filter creates START_FILTER_UPDATE, RECEIVE_FILTER_CHOICES", () => {
    const expectedActions = [
      {
        type: "START_FILTER_UPDATE",
        key: "category",
        parentKey: undefined,
        parentValue: undefined
      },
      {
        type: "RECIEVE_FILTER_CHOICES",
        key: "category",
        items: [
          {
            name: "C1",
            id: "c1"
          },
          {
            name: "C2",
            id: "c2"
          }
        ]
      }
    ];
    const store = mockStore({
      dataFilters: {
        available: initialDataFilters,
        selected: []
      }
    });

    return store.dispatch(actions.updateFilters("category")).then(() => {
      expect(store.getActions()[0]).toEqual(expectedActions[0]);
      expect(store.getActions()[1]).toEqual(expectedActions[1]);
    });
  });

  it("updateFilters with parent value creates START_FILTER_UPDATE, RECEIVE_FILTER_CHOICES", () => {
    const expectedActions = [
      {
        type: "START_FILTER_UPDATE",
        key: "subcategory",
        parentKey: "category",
        parentValue: "c1"
      },
      {
        type: "RECIEVE_FILTER_CHOICES",
        key: "subcategory",
        items: [
          {
            name: "s1",
            id: "s1"
          },
          {
            name: "s2",
            id: "s2"
          }
        ]
      }
    ];
    const store = mockStore({
      dataFilters: {
        available: initialDataFilters,
        selected: []
      }
    });

    return store
      .dispatch(actions.updateFilters("subcategory", "category", "c1"))
      .then(() => {
        expect(store.getActions()[0]).toEqual(expectedActions[0]);
        expect(store.getActions()[1]).toEqual(expectedActions[1]);
      });
  });
});
