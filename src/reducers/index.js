import { combineReducers } from "redux";
import entities from "./entities";
import searchFilters from "./searchFilters";
import search from "./search";

export default combineReducers({
  selectedEntities: entities,
  selectedSearchFilters: searchFilters,
  searchResults: search
});
