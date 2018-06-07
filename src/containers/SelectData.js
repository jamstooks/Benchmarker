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

// const modifiedAddDataPoint = (key, value) => {
//   return dispatch => {
//     dispatch(selectDataFilter(key, value));
//     return fetchPost().then(
//       response => dispatch({ type: 'GET_POST_SUCCESS', id,  response }),
//       error => {
//         dispatch({ type: 'GET_POST_FAILURE', id,  error })
//         throw error
//       }
//     )
//   }
// }
// }

const addDataFilterAndUpdateData = (key, value) => {
  return (dispatch, getState) => {
    new Promise(function(resolve) {
      let action = selectDataFilter(key, value);
      console.log("action");
      console.log(action);
      dispatch(action);
      return resolve();
    }).then(() => {
      console.log("doing the fetch..");
      dispatch(
        fetchViewData(
          getState().selectedEntities,
          getState().dataFilters.selected
        )
      );
    });
  };
};

const mapStateToProps = state => ({
  filters: state.dataFilters
});

const mapDispatchToProps = dispatch => ({
  add: (key, value) => dispatch(addDataFilterAndUpdateData(key, value)),
  remove: key => dispatch(removeDataFilter(key)),
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
