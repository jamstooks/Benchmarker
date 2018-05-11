import fetch from "cross-fetch";

export const startSearch = filters => ({
  type: "START_SEARCH",
  filters
});

export const receiveSearch = json => {
  return {
    type: "RECEIVE_SEARCH",
    results: json.institutions,
    receivedAt: Date.now()
  };
};

export function runSearch(filters) {
  return function(dispatch) {
    dispatch(startSearch(filters));

    let url = "https://api.myjson.com/bins/1a9tzi";
    return fetch(url)
      .then(
        response => response.json(),
        error => console.log("An error occurred.", error)
      )
      .then(json => dispatch(receiveSearch(json)));
  };
}
