import { combineReducers } from "redux";
import entities from "./entities";
import searchFilters from "./searchFilters";
import search from "./search";
import groups from "./groups";
import selectedGroups from "./selectedGroups";

export const selectedEntitiesReducers = {
  selectedEntities: entities,
  selectedSearchFilters: searchFilters,
  searchResults: search,
  availableGroups: groups,
  selectedGroups: selectedGroups
};

export default combineReducers(selectedEntitiesReducers);
