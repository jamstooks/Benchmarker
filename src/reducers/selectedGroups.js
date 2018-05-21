import { addOrRemove } from "../utils";

const selectedGroups = (state = { aggregate: [], individual: [] }, action) => {
  let aggregate = [];
  switch (action.type) {
    case "ADD_AGG_GROUP":
      aggregate = [...state.aggregate, action.groupKey];
      return { ...state, ...{ aggregate: aggregate } };
    case "REMOVE_AGG_GROUP":
      aggregate = state.aggregate.filter(k => {
        return k != action.groupKey;
      });
      return { ...state, ...{ aggregate: aggregate } };
    default:
      return state;
  }
};

export default selectedGroups;
