import "cross-fetch/polyfill";
import Connector from "../connector.js";

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

    return Connector.getSearchFilters()
      .then(filters => dispatch(receiveFetchSearchFilters(filters)));
  };
}
