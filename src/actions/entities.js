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
export const removeEntity = entity => ({
  type: "REMOVE_ENTITY",
  entity
});
