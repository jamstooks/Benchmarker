/**
 * Adding an institution submission or group
 */
export const addEntity = entity => ({
  type: "ADD_ENTITY",
  entity
});

/**
 * Removing an institution submission or group
 */
export const removeEntity = entityID => ({
  type: "REMOVE_ENTITY",
  entityID
});

/**
 * Toggles the selection of a version for an individual entity
 * Will either add or remove the specified version from
 * `selectedVersions`.
 */
export const toggleVersion = (entityID, versionID) => ({
  type: "TOGGLE_VERSION",
  entityID,
  versionID
});
