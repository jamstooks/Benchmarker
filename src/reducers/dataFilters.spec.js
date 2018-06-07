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
          items: [
            { title: "first", key: "cat1", id: 1 },
            { title: "second", key: "cat2", id: 2 }
          ]
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
          items: [
            { title: "first sub", key: "cat1", id: 3 },
            { title: "second sub", key: "cat2", id: 4 }
          ]
        },
        value: 3,
        parentKey: "category"
      }
    ]
  },
  selected: [{ title: "Category 1", key: "cat_1", id: 1 }]
};

describe("datafilters reducer", () => {
  it("should handle initial state", () => {
    expect(datafilters(undefined, []).selected).toEqual([]);
    expect(datafilters(undefined, []).available).toEqual({
      isFetching: false,
      filters: []
    });
  });

  it("should handle START_FETCH_DATA_FILTERS", () => {
    expect(
      datafilters(
        {
          available: { isFetching: false, filters: [] },
          selected: []
        },
        {
          type: "START_FETCH_DATA_FILTERS"
        }
      ).available.isFetching
    ).toEqual(true);
  });

  it("should handle RECEIVE_DATA_FILTERS", () => {
    expect(
      datafilters(
        {
          available: { isFetching: false, filters: [] },
          selected: []
        },
        {
          type: "RECEIVE_DATA_FILTERS",
          filters: [
            { key: "key", name: "filter" },
            { key: "key2", name: "filter2" }
          ]
        }
      ).available.filters
    ).toEqual([
      { key: "key", name: "filter" },
      { key: "key2", name: "filter2" }
    ]);
  });

  it("should handle SELECT_DATA_FILTER", () => {
    expect(
      datafilters(baseState, {
        type: "SELECT_DATA_FILTER",
        choice: { title: "Category 2", key: "cat_2", id: 2 }
      }).selected
    ).toEqual([
      { title: "Category 1", key: "cat_1", id: 1 },
      { title: "Category 2", key: "cat_2", id: 2 }
    ]);
  });

  it("should handle REMOVE_DATA_FILTER", () => {
    expect(
      datafilters(baseState, {
        type: "REMOVE_DATA_FILTER",
        key: "cat_1"
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
      items: [
        { name: "subcat 3", id: 5, key: "sub_3" },
        { name: "subcat 4", id: 6, key: "sub_4" }
      ]
    });
    expect(result.available.filters[1].choices).toEqual({
      isFetching: false,
      items: [
        { name: "subcat 3", id: 5, key: "sub_3" },
        { name: "subcat 4", id: 6, key: "sub_4" }
      ]
    });
    expect(result.available.filters[1].value).toEqual(null);
  });
});
