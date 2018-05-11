/**
 * Adding a filter for data
 */
export const addDataFilter = filter => ({
  type: "ADD_DATA_FILTER",
  filter
});

/**
 * Removing a filter for data
 */
export const removeDataFilter = key => ({
  type: "REMOVE_DATA_FILTER",
  key
});
