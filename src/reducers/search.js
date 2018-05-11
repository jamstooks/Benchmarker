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
        didInvalidate: false
      });
    case "RECEIVE_SEARCH":
      return Object.assign({}, state, {
        isFetching: false,
        didInvalidate: false,
        entities: action.institutions,
        lastUpdated: action.receivedAt
      });
    default:
      return state;
  }
};

export default search;
