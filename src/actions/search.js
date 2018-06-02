import "cross-fetch/polyfill";
import { getFilteredInstitutions } from "../connector.js";

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

    // let url = "https://api.myjson.com/bins/1f579a";
    // let url = "http://" + HOST + ":" + PORT + "/api/institutions/?format=json";
    return getFilteredInstitutions(filters)
      .then(
        response => response.json(),
        error => console.log("An error occurred.", error)
      )
      .then(json => dispatch(receiveSearch(json)));
  };
}
