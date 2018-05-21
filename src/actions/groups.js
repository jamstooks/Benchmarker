/**
 * Groups need to persist, but be quickly accessed.
 * So, they have a traditional fetch-based cycle, but
 * will be cached in the state for quick access.
 *
 * Currently stored in cookies but using promises
 * to make the switch to fetch easier.
 */
import cookie from "react-cookies";

/**
 * Send a request for all groups from the store
 */
export const startRequestAllGroups = () => ({
  type: "START_REQUEST_ALL_GROUPS"
});

/**
 * Handle the receipt of the saved groups from the store
 */
export const recieveAllGroups = groups => ({
  type: "RECIEVE_ALL_GROUPS",
  groups,
  receivedAt: Date.now()
});

/**
 * Create and save an ad-hoc group
 * Groups will be created with a placeholder name
 */
export const requestCreateAdhocGroup = () => ({
  type: "REQUEST_NEW_ADHOC_GROUP"
});

/**
 * Create and save a new ad-hoc group
 */
// export const receiveNewAdhocGroup = group => ({
//   type: "RECEIVE_NEW_ADHOC_GROUP",
//   group
// });

/**
 * Rename an ad-hoc group
 */
// export const renameAdhocGroup = (groupID, newName) => ({
//   type: "RENAME_ADHOC_GROUP",
//   groupID,
//   newName
// });

/**
 * Delete a saved ad-hoc group
 */
export const deleteAdhocGroup = groupKey => ({
  type: "DELETE_ADHOC_GROUP",
  groupKey
});

/**
 * Add an entity to an ad-hoc group
 */
export const requestAddToAdhocGroup = (entity, groupKey) => ({
  type: "REQUEST_ADD_TO_ADHOC_GROUP",
  entity,
  groupKey
});

/**
 * Add an entity to an ad-hoc group
 *
 * We use groupLookupKeys for each entity within a group, because
 * entities can be duplicated within groups
 */
export const requestRemoveFromAdhocGroup = (keyWithinGroup, groupKey) => ({
  type: "REQUEST_REMOVE_FROM_ADHOC_GROUP",
  keyWithinGroup,
  groupKey
});

export function fetchGroups() {
  return function(dispatch) {
    dispatch(startRequestAllGroups());
    // Using a promise here until we use fetch
    var promise = new Promise(function(resolve) {
      let groups = cookie.load("savedGroups");
      groups = groups === undefined ? [] : groups;
      return resolve(dispatch(recieveAllGroups(groups)));
    });
    return promise;
  };
}

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
 * Takes a optional keys for testing purposes
 */
export function addToNewGroup(entity, newGroupKey, keyWithinGroup) {
  return function(dispatch) {
    dispatch(requestCreateAdhocGroup());
    // Using a promise here until we use fetch
    var promise = new Promise(function(resolve) {
      let groups = cookie.load("savedGroups");
      console.log("existing groups");
      groups = groups != undefined ? groups : [];
      console.log(groups);
      let group = {
        type: "ADHOC_GROUP",
        name: "New Group",
        key: newGroupKey === undefined ? Date.now() : newGroupKey,
        entities: []
      };
      _addEntityToGroup(entity, group, keyWithinGroup);
      console.log("groups to save");
      console.log(groups);
      groups.push(group);
      cookie.save("savedGroups", groups);
      return resolve(dispatch(recieveAllGroups(groups)));
    });
    return promise;
  };
}

/**
 * @todo - add error handling
 *
 * takes an optional keyWithinGroup for testing purposes
 */
export function addToGroup(entity, groupKey, keyWithinGroup) {
  return function(dispatch) {
    dispatch(requestAddToAdhocGroup(entity, groupKey));
    // Using a promise here until we use fetch
    var promise = new Promise(function(resolve) {
      let groups = cookie.load("savedGroups");
      // find the specific group
      let group = groups.find(g => g.key == groupKey);
      console.log("adding to existing group with key: " + keyWithinGroup);
      _addEntityToGroup(entity, group, keyWithinGroup);
      cookie.save("savedGroups", groups);
      return resolve(dispatch(recieveAllGroups(groups)));
    });
    return promise;
  };
}

export function removeFromAdhocGroup(keyWithinGroup, groupKey) {
  return function(dispatch) {
    dispatch(requestRemoveFromAdhocGroup(keyWithinGroup, groupKey));
    // Using a promise here until we use fetch
    var promise = new Promise(function(resolve) {
      let groups = cookie.load("savedGroups");

      let group = groups.find(g => g.key == groupKey);
      let i = group.entities.findIndex(e => e.keyWithinGroup == keyWithinGroup);
      group.entities.splice(i, 1);

      cookie.save("savedGroups", groups);
      return resolve(dispatch(recieveAllGroups(groups)));
    });
    return promise;
  };
}
