import { combineReducers } from "redux";
import entities from "./entities";
import searchFilters from "./searchFilters";
import search from "./search";
import groups from "./groups";
import selectedGroups from "./selectedGroups";
import dataFilters from "./dataFilters";
import viewData from "./viewData";

export const allReducers = {
  selectedEntities: entities,
  searchFilters: searchFilters,
  searchResults: search,
  availableGroups: groups,
  selectedGroups: selectedGroups,
  dataFilters: dataFilters,
  viewData: viewData
};

export default combineReducers(allReducers);
