import "cross-fetch/polyfill";
import { getSearchFilters } from "../connector.js";

/**
 * Updates a specific filter. Uses filter[key]
 */
export const updateSearchFilter = filter => ({
  type: "UPDATE_SEARCH_FILTER",
  filter
});

/**
 * This resets all the search filter values to ""
 */
export const resetSearchFilters = () => ({
  type: "RESET_SEARCH_FILTERS"
});

/**
 *
 */
export const startFetchSearchFilters = () => ({
  type: "START_FETCH_SEARCH_FILTERS"
});

/**
 *
 */
export const receiveFetchSearchFilters = filters => ({
  type: "RECEIVE_FETCH_SEARCH_FILTERS",
  filters
});

export function fetchSearchFilters() {
  return function(dispatch) {
    dispatch(startFetchSearchFilters());

    // let url = "http://" + HOST + ":" + PORT + "/api/institution-filters/";
    return getSearchFilters()
      .then(
        response => response.json(),
        error => console.log("An error occurred.", error)
      )
      .then(json => dispatch(receiveFetchSearchFilters(json)));
  };
}
