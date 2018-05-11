const dataFilters = (state = [], action) => {
  switch (action.type) {
    case "ADD_DATA_FILTER":
      return [...state, action.filter];
    case "REMOVE_DATA_FILTER":
      return state.filter(f => {
        return f.key != action.key;
      });
    default:
      return state;
  }
};

export default dataFilters;
