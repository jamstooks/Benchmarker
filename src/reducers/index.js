import { combineReducers } from "redux";
import selectedEntities from "./selectedEntities";
import searchFilters from "./searchFilters";
import searchResults from "./searchResults";
import groups from "./groups";
import selectedGroups from "./selectedGroups";
import dataFilters from "./dataFilters";
import viewData from "./viewData";

/**
 * Not using combineReducers here because of the naming conflicts
 *
 * const entities = combineReducers({
 * https://redux.js.org/basics/reducers
 */
// let entities = (state = {}, action) => ({

const search = combineReducers({
  filters: searchFilters,
  results: searchResults
});

const selected = combineReducers({
  entities: selectedEntities,
  groups: selectedGroups
});

const entities = combineReducers({
  search,
  selected,
  groups
});

export const allReducers = {
  entities,
  dataFilters: dataFilters,
  viewData: viewData
};

export default combineReducers(allReducers);
