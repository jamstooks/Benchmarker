/**
 * The connector handles all API connections.
 * Eventually, we might allow the connector to
 * be passed in to the app.
 *
 * Each method must return a promise. Most often
 * this is just a simple `fetch`, but it could use
 * cookies or something else
 */

import "cross-fetch/polyfill";

// these will likely end up being props as well.
import { HOST, PORT } from "./config.js";

export const getSearchFilters = () => {
  let url = "http://" + HOST + ":" + PORT + "/api/institution-filters/";
  return fetch(url);
};

export const getFilteredInstitutions = filters => {
  let url = "http://" + HOST + ":" + PORT + "/api/institutions/";
  let queryString = Object.keys(filters)
    .map(key => key + "=" + filters[key])
    .join("&");
  return fetch(url + "?" + queryString);
};
