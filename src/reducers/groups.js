const groups = (
  state = {
    isFetching: false,
    didInvalidate: false,
    groups: [],
    beingRenamed: []
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
        groups: [],
        lastUpdated: null,
        beingRenamed: []
      });
    case "RECEIVE_ALL_GROUPS":
      return Object.assign({}, state, {
        isFetching: false,
        didInvalidate: false,
        groups: action.groups != "undefined" ? action.groups : [],
        lastUpdated: action.receivedAt,
        beingRenamed: []
      });
    case "START_REQUEST_RENAME_GROUP":
      let beingRenamed = [...state.beingRenamed, action.groupKey];
      return { ...state, ...{ beingRenamed: beingRenamed } };
    case "RECEIVE_RENAMED_GROUP":
      beingRenamed = state.beingRenamed.filter(i => i.key == action.groupKey);
      let ns = { ...state, ...{ beingRenamed: beingRenamed } };
      console.log("new state");
      console.log(ns);
      return ns;
    default:
      return state;
  }
};

export default groups;
