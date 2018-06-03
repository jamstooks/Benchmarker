import "cross-fetch/polyfill";
import Connector from "../connector.js";

export const startSearch = filters => ({
  type: "START_SEARCH",
  filters
});

export const receiveSearch = json => {
  return {
    type: "RECEIVE_SEARCH",
    results: json,
    receivedAt: Date.now()
  };
};

export function runSearch(filters) {
  return function(dispatch) {

    dispatch(startSearch(filters));
    return Connector.getFilteredInstitutions(filters)
      .then(entities => dispatch(receiveSearch(entities)));
  };
}
