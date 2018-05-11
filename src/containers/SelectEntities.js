import { connect } from "react-redux";
import { addEntity, removeEntity } from "../actions/entities";
import { runSearch } from "../actions/search";
import { updateSearchFilter } from "../actions/searchFilters";
import FilteredSelector from "../components/FilteredSelector";

const searchFilters = [
  {
    choices: {
      list: [
        { value: "", title: "Select One" },
        { value: "Reporter", title: "Reporter" },
        { value: "Bronze", title: "Bronze" },
        { value: "Silver", title: "Silver" },
        { value: "Gold", title: "Gold" },
        { value: "Platinum", title: "Platinum" }
      ]
    },
    keyName: "rating",
    title: "Rating"
  },
  {
    choices: {
      list: [
        { value: "", title: "Select One" },
        { value: "Doctoral/Research", title: "Doctoral/Research" },
        { value: "Master", title: "Master" },
        { value: "Baccalaureate", title: "Baccalaureate" },
        { value: "Associate", title: "Associate" }
      ]
    },
    keyName: "type",
    title: "Type"
  }
];

const searchResultColumns = [
  {
    title: "Institution Name",
    key: "name"
  },
  {
    title: "Rating",
    key: "rating"
  },
  {
    title: "Type",
    key: "type"
  }
];

const mapStateToProps = state => ({
  selection: state.selectedEntities,
  searchFilters: searchFilters,
  selectedSearchFilters: state.selectedSearchFilters,
  searchResultColumns: searchResultColumns,
  searchResults:
    state.searchResults != undefined ? state.searchResults.entities : [],
  isFetching:
    state.searchResults != undefined ? state.searchResults.isFetching : false
});

const mapDispatchToProps = dispatch => ({
  // toggleTodo: id => dispatch(toggleTodo(id))

  updateSearchFilter: filter => dispatch(updateSearchFilter(filter)),
  add: entity => dispatch(addEntity(entity)),
  remove: id => dispatch(removeEntity(id)),
  startSearch: filters => dispatch(runSearch(filters))
});

export default connect(mapStateToProps, mapDispatchToProps)(FilteredSelector);
