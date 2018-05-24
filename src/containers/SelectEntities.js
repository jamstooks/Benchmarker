import { connect } from "react-redux";
import { addEntity, removeEntity, toggleVersion } from "../actions/entities";
import { runSearch } from "../actions/search";
import {
  updateSearchFilter,
  resetSearchFilters
} from "../actions/searchFilters";
import {
  fetchGroups,
  addToNewGroup,
  addToGroup,
  removeFromAdhocGroup,
  renameGroup
} from "../actions/groups";
import { addAggGroup, removeAggGroup } from "../actions/selectedGroups";
import FilteredSelector from "../components/FilteredSelector";

import { searchResultColumns, searchFilters } from "../config.js";

const mapStateToProps = state => ({
  selection: state.selectedEntities,
  selectedGroups:
    state.selectedGroups != undefined
      ? state.selectedGroups
      : { aggregate: [], individual: [] },
  searchFilters: searchFilters,
  selectedSearchFilters: state.selectedSearchFilters,
  searchResultColumns: searchResultColumns,
  searchResults:
    state.searchResults != undefined ? state.searchResults.entities : [],
  isFetching:
    state.searchResults != undefined ? state.searchResults.isFetching : false,
  availableGroups:
    state.availableGroups != undefined
      ? state.availableGroups
      : {
          isFetching: false,
          didInvalidate: false,
          groups: []
        }
});

const mapDispatchToProps = dispatch => ({
  updateSearchFilter: filter => dispatch(updateSearchFilter(filter)),
  resetSearchFilters: () => dispatch(resetSearchFilters()),
  add: entity => dispatch(addEntity(entity)),
  remove: id => dispatch(removeEntity(id)),
  addAggGroup: key => dispatch(addAggGroup(key)),
  removeAggGroup: key => dispatch(removeAggGroup(key)),
  startSearch: filters => dispatch(runSearch(filters)),
  toggleVersion: (entity, version) => dispatch(toggleVersion(entity, version)),
  fetchGroups: fetchGroups,
  addToNewGroup: entity => dispatch(addToNewGroup(entity)),
  addToGroup: (entity, groupKey) => dispatch(addToGroup(entity, groupKey)),
  removeFromGroup: (keyWithinGroup, groupKey) =>
    dispatch(removeFromAdhocGroup(keyWithinGroup, groupKey)),
  renameGroup: (groupKey, newName) => dispatch(renameGroup(groupKey, newName)),
  dispatch
});

export default connect(mapStateToProps, mapDispatchToProps)(FilteredSelector);
