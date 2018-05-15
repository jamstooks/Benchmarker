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
 */
export const removeFromAdhocGroup = (entityID, groupKey) => ({
  type: "REMOVE_FROM_ADHOC_GROUP",
  entityID,
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
 * Takes an optional key for testing purposes
 */
export function addToNewGroup(entity, newGroupKey) {
  return function(dispatch) {
    dispatch(requestCreateAdhocGroup());
    // Using a promise here until we use fetch
    var promise = new Promise(function(resolve) {
      let groups = cookie.load("savedGroups");
      groups = groups === undefined ? [] : groups;
      let group = {
        type: "ADHOC_GROUP",
        name: "New Group",
        key: newGroupKey === undefined ? Date.now() : newGroupKey,
        entities: [entity]
      };
      groups.push(group);
      cookie.save("savedGroups", groups);
      return resolve(dispatch(recieveAllGroups(groups)));
    });
    return promise;
  };
}

/**
 * @todo - add error handling
 */
export function addToGroup(entity, groupKey) {
  return function(dispatch) {
    dispatch(requestAddToAdhocGroup(entity, groupKey));
    // Using a promise here until we use fetch
    var promise = new Promise(function(resolve) {
      let groups = cookie.load("savedGroups");
      // find the specific group
      let group = groups.find(g => g.key == groupKey);
      group.entities.push(entity);
      cookie.save("savedGroups", groups);
      return resolve(dispatch(recieveAllGroups(groups)));
    });
    return promise;
  };
}
