import { connect } from "react-redux";
import {
  selectDataFilter,
  removeDataFilter,
  updateFilter,
  fetchFilters,
  getChoicesForFilter
} from "../actions/dataFilters";
import { fetchViewData } from "../actions/viewData";
import DataFilters from "../components/DataFilters";

/**
 * Combining adding data filter and fetching new data
 */
const addDataFilterAndUpdateData = (key, value) => {
  return (dispatch, getState) => {
    new Promise(function(resolve) {
      dispatch(selectDataFilter(key, value));
      return resolve();
    }).then(() => {
      if (getState().entities.selected.entities.length !== 0) {
        dispatch(
          fetchViewData(
            getState().entities.selected.entities,
            getState().dataFilters.selected
          )
        );
      }
    });
  };
};

/**
 * Combining removing data filter and fetching new data
 *
 * @todo - this shouldn't really fetch, just remove data
 */
const removeDataFilterAndUpdateData = key => {
  return (dispatch, getState) => {
    new Promise(function(resolve) {
      dispatch(removeDataFilter(key));
      return resolve();
    }).then(() => {
      if (getState().entities.selected.entities.length !== 0) {
        dispatch(
          fetchViewData(
            getState().entities.selected.entities,
            getState().dataFilters.selected
          )
        );
      }
    });
  };
};

const mapStateToProps = state => ({
  filters: state.dataFilters
});

const mapDispatchToProps = dispatch => ({
  add: (key, value) => dispatch(addDataFilterAndUpdateData(key, value)),
  remove: key => dispatch(removeDataFilterAndUpdateData(key)),
  updateFilter: (changedFilterKey, newValue) =>
    dispatch(updateFilter(changedFilterKey, newValue)),
  fetchFilters: fetchFilters,
  getChoicesForFilter: getChoicesForFilter,
  dispatch
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DataFilters);
