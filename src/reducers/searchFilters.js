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
      return {
        ...state,
        ...{ selected: { ...state.selected, ...action.filter } }
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
