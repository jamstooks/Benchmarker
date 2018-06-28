const searchResults = (
  state = {
    isFetching: false,
    entities: []
  },
  action
) => {
  switch (action.type) {
    case "START_SEARCH":
      return Object.assign({}, state, {
        isFetching: true,
        entities: []
      });
    case "RECEIVE_SEARCH":
      return Object.assign({}, state, {
        isFetching: false,
        entities: action.results,
        lastUpdated: action.receivedAt
      });
    default:
      return state;
  }
};

export default searchResults;
