const searchFilters = (state = {}, action) => {
  switch (action.type) {
    case "UPDATE_SEARCH_FILTER":
      return { ...state, ...action.filter };
    default:
      return state;
  }
};

export default searchFilters;
