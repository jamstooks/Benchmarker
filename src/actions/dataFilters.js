import Connector from "../connector.js";

/**
 * Adding a filter to the selected filters
 */
export const selectDataFilter = choice => ({
  type: "SELECT_DATA_FILTER",
  choice
});

/**
 * Removing a filter for data
 */
export const removeDataFilter = key => ({
  type: "REMOVE_DATA_FILTER",
  key
});

/**
 * Begin to fetch the filters
 */
export const startFetchDataFilters = () => ({
  type: "START_FETCH_DATA_FILTERS"
});

/**
 * Recieve the filters
 */
export const receiveDataFilters = filters => ({
  type: "RECEIVE_DATA_FILTERS",
  filters
});

/**
 *
 */
export const startFetchChoices = (filterKey, parentValue) => ({
  type: "START_FETCH_CHOICES",
  filterKey,
  parentValue
});

/**
 * Run when a user selects a new value for a select-type filter
 */
export const updateFilter = (changedFilterKey, newValue) => ({
  type: "UPDATE_FILTER",
  changedFilterKey,
  newValue
});

/**
 * Receive the updated choices for a filter by key
 * and reset any children as necessary
 */
export const recieveFilterChoices = (filterKey, items) => ({
  type: "RECIEVE_FILTER_CHOICES",
  filterKey,
  items
});

/**
 * Gets all the intitial filters
 */
export function fetchFilters() {
  return function(dispatch) {
    dispatch(startFetchDataFilters());
    return Connector.getDataFilters().then(filters =>
      dispatch(receiveDataFilters(filters))
    );
  };
}

/**
 * Gets the first set of filters for the top-level filter
 */
export function getChoicesForFilter(filterKey, parentValue) {
  return function(dispatch) {
    dispatch(startFetchChoices(filterKey, parentValue));
    return Connector.getDataFilterChoices(filterKey, parentValue).then(items =>
      dispatch(recieveFilterChoices(filterKey, items))
    );
  };
}
