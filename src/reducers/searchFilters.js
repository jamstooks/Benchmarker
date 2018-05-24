const searchFilters = (state = {}, action) => {
  switch (action.type) {
    case "UPDATE_SEARCH_FILTER":
      return { ...state, ...action.filter };
    case "RESET_SEARCH_FILTERS":
      return {};
    default:
      return state;
  }
};

export default searchFilters;
