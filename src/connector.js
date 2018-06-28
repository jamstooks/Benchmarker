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
// import fetch from "cross-fetch";
import cookie from "react-cookies";

const BASE_URL = process.env.REACT_APP_APIURL;

// @todo - provide a mock connector
// @todo - this should be passed as a prop

const Connector = {
  getSearchFilters: () => {
    let url = BASE_URL + "/api/institution-filters/";
    return fetch(url).then(
      response => response.json(),
      error => console.log("An error occurred.", error)
    );
  },

  getFilteredInstitutions: filters => {
    let url = BASE_URL + "/api/institutions/";
    let queryString = Object.keys(filters)
      .map(key => key + "=" + filters[key])
      .join("&");
    return fetch(url + "?" + queryString).then(
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
      let i = group.entities.findIndex(
        e => e.keyWithinGroup === keyWithinGroup
      );
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
    let url = BASE_URL + "/api/datapoints/filters/";
    return fetch(url).then(
      response => response.json(),
      error => console.log("An error occurred.", error)
    );
  },

  getDataFilterChoices: (key, parentId) => {
    let url = BASE_URL + "/api/datapoints/items/";
    url += "?type=" + key;
    if (parentId !== undefined && parentId !== null) {
      url += "&parent=" + parentId;
    }
    return fetch(url).then(
      response => response.json(),
      error => console.log("An error occurred.", error)
    );
  },

  getViewData: (entities, dataFilters) => {
    let url = BASE_URL + "/api/submission-values/";
    let getParams = [];

    entities.forEach(e => {
      // if there aren't any selected versions, just grab the latest
      if (e.selectedVersions.length === 0) {
        let v = e.availableVersions.find(v => v.is_latest === true);
        getParams.push("report_id=" + v.id);
      } else {
        // for each selected version get it from available
        e.selectedVersions.forEach(v => {
          getParams.push("report_id=" + v);
        });
      }
    });

    dataFilters.forEach(f => {
      getParams.push("data_point_key=" + f.key);
    });

    url += "?" + getParams.join("&");

    return fetch(url)
      .then(
        response => response.json(),
        error => console.log("An error occurred.", error)
      )
      .then(data => _pivotStarsData(entities, dataFilters, data));
  }
};

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

/**
 * Pivots the received stars data to the benchmarker format of
 * 
 *    {list: [], columns: []}
 *
 * List format:
   [
    { 
      entity: { value: "U of Somewhere", link: "http://.."},
      d_1: { value: .54, link: "http://.." },
      d_2: { value: 1.7, link: "http://.." }
    },
    ...
  ]
 * Column format:
  [
    {'title': 'University', 'key': 'entity'},
    ...
  ]

  * @todo - consider performance enhancement...
  * could be server side with django-pivot
 */
export const _pivotStarsData = (entities, dataFilters, data) => {
  let columns = [
    { title: "Report", key: "entity", is_numeric: false, units: null }
  ];
  dataFilters.forEach(f => {
    let c = {
      title: f.title,
      key: f.key,
      is_numeric: f.is_numeric,
      units: f.units
    };
    columns.push(c);
  });

  // Create an object with properties for each report id
  let dataPointList = {};
  entities.forEach(e => {
    if (e.selectedVersions.length === 0) {
      let v = e.availableVersions.find(v => v.is_latest === true);
      dataPointList[v.id] = { entity: { value: e.name, link: v.report_url } };
    } else {
      e.selectedVersions.forEach(sv => {
        let v = e.availableVersions.find(v => v.id === sv);
        dataPointList[v.id] = { entity: { value: e.name, link: v.report_url } };
      });
    }
  });

  // Add the data point to the properties
  data.forEach(d => {
    dataPointList[d.report_id][d.data_point_key] = {
      value: d.imperial_value,
      link: d.detail_url
    };
  });

  // Pull it back out to the final format and add entities
  let list = [];
  Object.keys(dataPointList).forEach(k => {
    list.push(dataPointList[k]);
  });
  return { columns: columns, list: list };
};
