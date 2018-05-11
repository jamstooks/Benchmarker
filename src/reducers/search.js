const search = (
  state = {
    isFetching: false,
    didInvalidate: false,
    entities: []
  },
  action
) => {
  switch (action.type) {
    case "START_SEARCH":
      return Object.assign({}, state, {
        isFetching: true,
        didInvalidate: false,
        entities: []
      });
    case "RECEIVE_SEARCH":
      return Object.assign({}, state, {
        isFetching: false,
        didInvalidate: false,
        entities: action.results,
        lastUpdated: action.receivedAt
      });
    default:
      return state;
  }
};

export default search;
