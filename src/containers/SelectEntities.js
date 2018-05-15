import { connect } from "react-redux";
import { addEntity, removeEntity, toggleVersion } from "../actions/entities";
import { runSearch } from "../actions/search";
import { updateSearchFilter } from "../actions/searchFilters";
import { fetchGroups, addToNewGroup, addToGroup } from "../actions/groups";
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
    state.searchResults != undefined ? state.searchResults.isFetching : false,
  availableGroups:
    state.availableGroups != undefined ? state.availableGroups : {}
});

const mapDispatchToProps = dispatch => ({
  // toggleTodo: id => dispatch(toggleTodo(id))

  updateSearchFilter: filter => dispatch(updateSearchFilter(filter)),
  add: entity => dispatch(addEntity(entity)),
  remove: id => dispatch(removeEntity(id)),
  startSearch: filters => dispatch(runSearch(filters)),
  toggleVersion: (entity, version) => dispatch(toggleVersion(entity, version)),
  fetchGroups: fetchGroups,
  addToNewGroup: entity => dispatch(addToNewGroup(entity)),
  addToGroup: (entity, groupKey) => dispatch(addToGroup(entity, groupKey)),
  dispatch
});

export default connect(mapStateToProps, mapDispatchToProps)(FilteredSelector);
