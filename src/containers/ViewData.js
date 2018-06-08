import { connect } from "react-redux";
import DataView from "../components/DataView";

const mapStateToProps = state => ({
  isFetching: state.viewData.isFetching,
  isSorting: state.viewData.isSorting,
  items: state.viewData.items,
  sortColumn: state.viewData.sortColumn
});

const mapDispatchToProps = dispatch => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DataView);
