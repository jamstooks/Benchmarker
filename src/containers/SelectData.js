import { connect } from "react-redux";
import {
  selectDataFilter,
  removeDataFilter,
  updateFilters
} from "../actions/dataFilters";
import DataFilters from "../components/DataFilters";
import { initialDataFilters } from "../config.js";

const mapStateToProps = state => ({
  filters:
    state.dataFilters != undefined
      ? state.dataFilters
      : { available: initialDataFilters, selected: [] }
});

const mapDispatchToProps = dispatch => ({
  add: (key, value) => dispatch(selectDataFilter(key, value)),
  remove: key => dispatch(removeDataFilter(key)),
  updateFilters: (key, parentKey, parentValue) =>
    dispatch(updateFilters(key, parentKey, parentValue)),

  dispatch
});

export default connect(mapStateToProps, mapDispatchToProps)(DataFilters);
