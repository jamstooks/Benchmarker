import Connector from "../connector.js";

/**
 * When new view data is being fetched/calculated
 */
export const startUpdateViewData = () => ({
  type: "START_UPDATE_VIEW_DATA"
});

/**
 * Adding a filter to the selected filters
 *
 * `data` should be of the form: { columns: [], list: [] }
 */
export const receiveViewData = data => ({
  type: "RECEIVE_VIEW_DATA",
  data
});

/**
 * When view data is being sorted
 */
export const startSortViewData = columnKey => ({
  type: "START_SORT_VIEW_DATA",
  columnKey
});

/**
 * Gets the view data for the entities and data points
 *
 * doFirst is a method that has to happen first
 */
export function fetchViewData(entities, dataPoints) {
  return function(dispatch) {
    dispatch(startUpdateViewData());
    return Connector.getViewData(entities, dataPoints).then(data =>
      dispatch(receiveViewData(data))
    );
  };
}
