const groups = (
  state = {
    isFetching: false,
    available: [],
    beingRenamed: []
  },
  action
) => {
  switch (action.type) {
    case "START_REQUEST_ALL_GROUPS" ||
      "REQUEST_NEW_ADHOC_GROUP" ||
      "DELETE_ADHOC_GROUP":
      return {
        ...state,
        ...{
          isFetching: true,
          available: [],
          lastUpdated: null
        }
      };
    case "RECEIVE_ALL_GROUPS":
      return {
        ...state,
        ...{
          isFetching: false,
          available: action.groups !== "undefined" ? action.groups : [],
          lastUpdated: action.receivedAt
        }
      };
    case "START_REQUEST_RENAME_GROUP":
      let br = [...state.beingRenamed, action.groupKey];
      return { ...state, ...{ beingRenamed: br } };
    case "RECEIVE_RENAMED_GROUP":
      let br2 = state.beingRenamed.filter(i => i.key === action.groupKey);
      return { ...state, ...{ beingRenamed: br2 } };
    default:
      return state;
  }
};

export default groups;
