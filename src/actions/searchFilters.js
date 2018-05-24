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
