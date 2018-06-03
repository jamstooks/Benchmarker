const searchFilters = (
  state = {
    available: {
      isFetching: false,
      filters: []
    },
    selected: {}
  },
  action
) => {
  switch (action.type) {
    case 'UPDATE_SEARCH_FILTER':
      let selected = { ...state.selected, ...action.filter };
      // Exclude empty filters
      let newSelected = {}
      Object.keys(selected).forEach(k => {
        if(selected[k] !== "" || selected[k] === null) {
          newSelected[k] = selected[k];
        }
      });
      return {
        ...state,
        ...{ selected: newSelected }
      };
    case 'RESET_SEARCH_FILTERS':
      return { ...state, ...{ selected: {} } };
    case 'START_FETCH_SEARCH_FILTERS':
      return { ...state, ...{ available: { isFetching: true, filters: [] } } };
    case 'RECEIVE_FETCH_SEARCH_FILTERS':
      return {
        ...state,
        ...{ available: { isFetching: false, filters: action.filters } }
      };
    default:
      return state;
  }
};

export default searchFilters;
