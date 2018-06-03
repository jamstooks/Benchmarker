import datafilters from "./dataFilters";

const baseState = {
  available: {
    isFetching: false,
    filters: [
      {
        name: "Category",
        type: "select",
        key: "category",
        buttonTitle: "Add Score",
        choices: {
          isFetching: false,
          items: [{ name: "cat1", id: 1 }, { name: "cat2", id: 2 }]
        },
        value: 1,
        parentKey: null
      },
      {
        name: "Subcategory",
        type: "select",
        key: "subcategory",
        buttonTitle: "Add Score",
        choices: {
          isFetching: false,
          items: [{ name: "subcat1", id: 3 }, { name: "subcat2", id: 4 }]
        },
        value: 3,
        parentKey: "category"
      }
    ]
  },
  selected: [["initialKey", "initialValue"]]
};

describe("datafilters reducer", () => {
  it("should handle initial state", () => {
    expect(datafilters(undefined, []).selected).toEqual([]);
    expect(datafilters(undefined, []).available).toEqual({isFetching: false, filters: []});
  });
  
  it("should handle START_FETCH_DATA_FILTERS", () => {
    expect(
      datafilters(
        {
          available: {isFetching: false, filters: []},
          selected: []
        },
        {
        type: "START_FETCH_DATA_FILTERS"
      }).available.isFetching
    ).toEqual(true);
  });
  
  it("should handle RECEIVE_DATA_FILTERS", () => {
    expect(
      datafilters(
        {
          available: {isFetching: false, filters: []},
          selected: []
        },
        {
        type: "RECEIVE_DATA_FILTERS",
        filters: [1, 2]
      }).available.filters
    ).toEqual([1, 2]);
  });

  it("should handle SELECT_DATA_FILTER", () => {
    expect(
      datafilters(baseState, {
        type: "SELECT_DATA_FILTER",
        key: "key",
        value: "filter"
      }).selected
    ).toEqual([["initialKey", "initialValue"], ["key", "filter"]]);
  });

  it("should handle REMOVE_DATA_FILTER", () => {
    expect(
      datafilters(baseState, {
        type: "REMOVE_DATA_FILTER",
        key: "initialKey",
        value: "initialValue"
      }).selected
    ).toEqual([]);
  });

  it("should handle UPDATE_FILTER", () => {
    let result = datafilters(baseState, {
      type: "UPDATE_FILTER",
      changedFilterKey: "category",
      newValue: 2
    });
    expect(result.available.filters[0].value).toEqual(2);
    expect(result.available.filters[1].choices).toEqual({
      isFetching: false,
      items: []
    });
    expect(result.available.filters[1].value).toEqual(null);
  });

  it("should handle RECIEVE_FILTER_CHOICES", () => {
    let result = datafilters(baseState, {
      type: "RECIEVE_FILTER_CHOICES",
      filterKey: "subcategory",
      items: [{ name: "subcat3", id: 5 }, { name: "subcat4", id: 6 }]
    });
    expect(result.available.filters[1].choices).toEqual({
      isFetching: false,
      items: [{ name: "subcat3", id: 5 }, { name: "subcat4", id: 6 }]
    });
    expect(result.available.filters[1].value).toEqual(null);
  });
});
