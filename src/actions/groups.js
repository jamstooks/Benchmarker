/**
 * Groups need to persist, but be quickly accessed.
 * So, they have a traditional fetch-based cycle, but
 * will be cached in the state for quick access.
 *
 * Currently stored in cookies but using promises
 * to make the switch to fetch easier.
 */
import Connector from "../connector.js";

/**
 * Send a request for all groups from the store
 */
export const startRequestAllGroups = () => ({
  type: "START_REQUEST_ALL_GROUPS"
});

/**
 * Handle the receipt of the saved groups from the store
 */
export const receiveAllGroups = groups => ({
  type: "RECEIVE_ALL_GROUPS",
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
 * Rename an ad-hoc group
 */
export const startRequestRenameGroup = groupKey => ({
  type: "START_REQUEST_RENAME_GROUP",
  groupKey
});

/**
 * Receive a renamed ad-hoc group
 */
export const receiveRenamedGroup = groupKey => ({
  type: "RECEIVE_RENAMED_GROUP",
  groupKey
});

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
    return Connector.fetchGroups().then(groups =>
      dispatch(receiveAllGroups(groups))
    );
  };
}

/**
 * Takes a optional keys for testing purposes
 */
export function addToNewGroup(entity, newGroupKey, keyWithinGroup) {
  return function(dispatch) {
    dispatch(requestCreateAdhocGroup());
    return Connector.addToNewGroup(entity, newGroupKey, keyWithinGroup).then(
      groups => dispatch(receiveAllGroups(groups))
    );
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
    return Connector.addToGroup(entity, groupKey, keyWithinGroup).then(groups =>
      dispatch(receiveAllGroups(groups))
    );
  };
}

export function removeFromAdhocGroup(keyWithinGroup, groupKey) {
  return function(dispatch) {
    dispatch(requestRemoveFromAdhocGroup(keyWithinGroup, groupKey));
    return Connector.removeFromGroup(keyWithinGroup, groupKey).then(groups =>
      dispatch(receiveAllGroups(groups))
    );
  };
}

/**
 * @todo - add error handling
 *
 * renames a group
 */
export function renameGroup(groupKey, newName) {
  return function(dispatch) {
    dispatch(startRequestRenameGroup(groupKey));
    return Connector.renameGroup(groupKey, newName).then(group =>
      dispatch(receiveRenamedGroup(group.key))
    );
  };
}
