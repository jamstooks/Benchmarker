import { connect } from "react-redux";
import {
  selectDataFilter,
  removeDataFilter,
  updateFilter,
  fetchFilters,
  getChoicesForFilter
} from "../actions/dataFilters";
import DataFilters from "../components/DataFilters";

const mapStateToProps = state => ({
  filters: state.dataFilters
});

const mapDispatchToProps = dispatch => ({
  add: (key, value) => dispatch(selectDataFilter(key, value)),
  remove: key => dispatch(removeDataFilter(key)),
  updateFilter: (changedFilterKey, newValue) =>
    dispatch(updateFilter(changedFilterKey, newValue)),
  fetchFilters: fetchFilters,
  getChoicesForFilter: getChoicesForFilter,

  dispatch
});

export default connect(mapStateToProps, mapDispatchToProps)(DataFilters);
