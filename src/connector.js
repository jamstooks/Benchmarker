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
import cookie from "react-cookies";

// these will likely end up being props as well.
import { HOST, PORT } from "./config.js";


const Connector = {

  getSearchFilters: () => {
    let url = "http://" + HOST + ":" + PORT + "/api/institution-filters/";
    return fetch(url)
      .then(
        response => response.json(),
        error => console.log("An error occurred.", error)
      );
  },

  getFilteredInstitutions: filters => {
    let url = "http://" + HOST + ":" + PORT + "/api/institutions/";
    let queryString = Object.keys(filters)
      .map(key => key + "=" + filters[key])
      .join("&");
    return fetch(url + "?" + queryString)
      .then(
        response => response.json(),
        error => console.log("An error occurred.", error)
      );
  },

  fetchGroups: () => {
    return new Promise(function(resolve) {
      let groups = cookie.load("savedGroups");
      groups = groups === undefined ? [] : groups;
      resolve(groups);
    });
  },

  addToNewGroup: (entity, newGroupKey, keyWithinGroup) => {
     return new Promise(function(resolve) {
      let groups = cookie.load("savedGroups");
      groups = groups !== undefined ? groups : [];
      let group = {
        type: "ADHOC_GROUP",
        name: "New Group " + (groups.length + 1),
        key: newGroupKey === undefined ? Date.now() : newGroupKey,
        entities: []
      };
      _addEntityToGroup(entity, group, keyWithinGroup);
      groups.push(group);
      cookie.save("savedGroups", groups);
      resolve(groups);
    });
  },
  
  addToGroup: (entity, groupKey, keyWithinGroup) => {
    return new Promise(function(resolve) {
      let groups = cookie.load("savedGroups");
      // find the specific group
      let group = groups.find(g => g.key === groupKey);
      _addEntityToGroup(entity, group, keyWithinGroup);
      cookie.save("savedGroups", groups);
      resolve(groups);
    });
  },
  
  removeFromGroup: (keyWithinGroup, groupKey) => {
    return new Promise(function(resolve) {
      let groups = cookie.load("savedGroups");
      let group = groups.find(g => g.key === groupKey);
      let i = group.entities.findIndex(e => e.keyWithinGroup === keyWithinGroup);
      group.entities.splice(i, 1);
      cookie.save("savedGroups", groups);
      return resolve(groups);
    });
  },
  
  renameGroup: (groupKey, newName) => {
    return new Promise(function(resolve) {
      let groups = cookie.load("savedGroups");
      let group = groups.find(g => g.key === groupKey);
      group.name = newName;
      cookie.save("savedGroups", groups);
      return resolve(group);
    });
  },
  
  getDataFilters: () => {
    let url = "http://" + HOST + ":" + PORT + "/api/datapoints/filters/";
    return fetch(url)
      .then(
        response => response.json(),
        error => console.log("An error occurred.", error)
      );
  },
  
  getDataFilterChoices: (key, parentId) => {
    let url = "http://" + HOST + ":" + PORT + "/api/datapoints/items/";
    url += "?type=" + key;
    if(parentId !== undefined && parentId !== null) {
      url += "&parent=" + parentId;
    }
    return fetch(url)
      .then(
        response => response.json(),
        error => console.log("An error occurred.", error)
      );
  }
}

export default Connector;

/**
 * just adds an entity to a group, no ajax or anything
 * returns a new group
 *
 * Takes an optional keyWithinGroup for testing purposes
 */
const _addEntityToGroup = (entity, group, keyWithinGroup) => {
  let kwg = keyWithinGroup === undefined ? Date.now() : keyWithinGroup;
  group.entities.push({
    ...entity,
    ...{
      keyWithinGroup: kwg
    }
  });
};