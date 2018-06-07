import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import fetchMock from "fetch-mock";

import * as actions from "./dataFilters";

const middleware = [thunk];
const mockStore = configureMockStore(middleware);

const mockFilters = [
  {
    name: "Category",
    type: "select",
    key: "category",
    buttonTitle: "Add Score",
    choices: {
      isFetching: false,
      items: []
    },
    value: null,
    parentKey: null
  },
  {
    name: "Subcategory",
    type: "select",
    key: "subcategory",
    buttonTitle: "Add Score",
    choices: {
      isFetching: false,
      items: []
    },
    value: null,
    parentKey: "category"
  }
];

const mockChoices = [
  {
    id: 4,
    title: "Subcategory 2",
    type: "subcategory",
    key: "sub_2",
    parent: 1
  },
  {
    id: 3,
    title: "Subcategory 1",
    type: "subcategory",
    key: "sub_1",
    parent: 1
  }
];

describe("data filter actions", () => {
  afterEach(() => {
    fetchMock.reset();
    fetchMock.restore();
  });

  it("selectDataFilter should create SELECT_DATA_FILTER action", () => {
    expect(
      actions.selectDataFilter({ name: "Category", key: "cat_1", id: 1 })
    ).toEqual({
      type: "SELECT_DATA_FILTER",
      choice: { name: "Category", key: "cat_1", id: 1 }
    });
  });

  it("removeDataFilter should create REMOVE_DATA_FILTER action", () => {
    expect(actions.removeDataFilter("key")).toEqual({
      type: "REMOVE_DATA_FILTER",
      key: "key"
    });
  });

  it("startFetchDataFilters should create REMOVE_DATA_FILTER action", () => {
    expect(actions.startFetchDataFilters()).toEqual({
      type: "START_FETCH_DATA_FILTERS"
    });
  });

  it("receiveDataFilters should create RECEIVE_DATA_FILTERS action", () => {
    expect(actions.receiveDataFilters([])).toEqual({
      type: "RECEIVE_DATA_FILTERS",
      filters: []
    });
  });

  it("updateFilter should create START_FILTER_UPDATE action", () => {
    expect(actions.updateFilter("category", 12)).toEqual({
      type: "UPDATE_FILTER",
      changedFilterKey: "category",
      newValue: 12
    });
  });

  it("recieveFilterChoices should create RECIEVE_FILTER_CHOICES action", () => {
    expect(
      actions.recieveFilterChoices("category", [
        { name: "cat1", id: 1 },
        { name: "cat2", id: 2 }
      ])
    ).toEqual({
      type: "RECIEVE_FILTER_CHOICES",
      filterKey: "category",
      items: [{ name: "cat1", id: 1 }, { name: "cat2", id: 2 }]
    });
  });

  it("fetchFilters should create START_FETCH_DATA_FILTERS and RECEIVE_DATA_FILTERS", () => {
    fetchMock.get("*", mockFilters);

    const expectedActions = [
      {
        type: "START_FETCH_DATA_FILTERS"
      },
      {
        type: "RECEIVE_DATA_FILTERS",
        filters: mockFilters
      }
    ];
    const store = mockStore({
      dataFilters: {
        available: {
          isFetching: false,
          filters: []
        },
        selected: []
      }
    });

    return store.dispatch(actions.fetchFilters()).then(() => {
      expect(store.getActions()[0]).toEqual(expectedActions[0]);
      expect(store.getActions()[1]).toEqual(expectedActions[1]);
    });
  });

  it("getChoicesForFilter should create START_FETCH_CHOICES and RECIEVE_FILTER_CHOICES", () => {
    fetchMock.get("*", mockChoices);

    const expectedActions = [
      {
        type: "START_FETCH_CHOICES",
        filterKey: "subcategory",
        parentValue: 1
      },
      {
        type: "RECIEVE_FILTER_CHOICES",
        filterKey: "subcategory",
        items: mockChoices
      }
    ];
    const store = mockStore({
      dataFilters: {
        available: {
          isFetching: false,
          filters: mockFilters
        },
        selected: []
      }
    });

    return store
      .dispatch(actions.getChoicesForFilter("subcategory", 1))
      .then(() => {
        expect(store.getActions()[0]).toEqual(expectedActions[0]);
        expect(store.getActions()[1]).toEqual(expectedActions[1]);
      });
  });
});
