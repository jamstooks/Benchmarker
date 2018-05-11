/**
 * Updates a specific filter. Uses filter[key]
 */
export const updateSearchFilter = filter => ({
  type: "UPDATE_SEARCH_FILTER",
  filter
});
