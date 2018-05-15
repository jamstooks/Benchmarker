const groups = (
  state = {
    isFetching: false,
    didInvalidate: false,
    groups: []
  },
  action
) => {
  switch (action.type) {
    case "START_REQUEST_ALL_GROUPS" ||
      "REQUEST_NEW_ADHOC_GROUP" ||
      "DELETE_ADHOC_GROUP":
      return Object.assign({}, state, {
        isFetching: true,
        didInvalidate: false,
        entities: []
      });
    case "RECIEVE_ALL_GROUPS":
      return Object.assign({}, state, {
        isFetching: false,
        didInvalidate: false,
        groups: action.groups,
        lastUpdated: action.receivedAt
      });
    default:
      return state;
  }
};

export default groups;
