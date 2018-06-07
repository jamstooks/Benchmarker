const dataFilters = (
  state = {
    available: {
      isFetching: false,
      filters: []
    },
    selected: []
  },
  action
) => {
  switch (action.type) {
    case "START_FETCH_DATA_FILTERS":
      return { ...state, ...{ available: { isFetching: true, filters: [] } } };
    case "RECEIVE_DATA_FILTERS":
      return {
        ...state,
        ...{ available: { isFetching: false, filters: action.filters } }
      };
    case "SELECT_DATA_FILTER":
      let s = [...state.selected, action.choice];
      return { ...state, ...{ selected: s } };
    case "REMOVE_DATA_FILTER":
      let s2 = state.selected.filter(f => {
        return f.key !== action.key;
      });
      return { ...state, ...{ selected: s2 } };
    case "START_FETCH_CHOICES":
      let a1 = { ...state.available };
      let f1 = a1.filters.find(f => f.key === action.filterKey);
      f1.choices.items = [];
      f1.choices.isFetching = true;
      return { ...state, ...{ available: a1 } };
    case "UPDATE_FILTER":
      let available = { ...state.available };
      let changedFilter = available.filters.find(
        f => f.key === action.changedFilterKey
      );
      changedFilter.value = action.newValue;

      // empty the choices and values for all children
      let firstChild = available.filters.find(
        f => f.parentKey === changedFilter.key
      );
      let childKey = firstChild !== undefined ? firstChild.key : undefined;

      // pulled this out of the forloop to avoid creating a function in a loop
      let findKey = (key, fieldName) => f => f[fieldName] === key;

      let key = childKey;
      while (key !== undefined) {
        let filter = available.filters.find(findKey(key, "key"));
        filter.choices = { isFetching: false, items: [] };
        filter.value = null;
        let child = available.filters.find(findKey(key, "parentKey"));
        key = child !== undefined ? child.key : undefined;
      }
      return { ...state, ...{ available: available } };
    case "RECIEVE_FILTER_CHOICES":
      let a = { ...state.available };
      let filter = a.filters.find(f => f.key === action.filterKey);
      filter.choices = {
        isFetching: false,
        items: action.items !== undefined ? action.items : []
      };
      filter.value = null;
      return { ...state, ...{ available: a } };
    default:
      return state;
  }
};

export default dataFilters;
