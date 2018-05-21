/**
 * Adding groups to selection
 */
export const addAggGroup = groupKey => ({
  type: "ADD_AGG_GROUP",
  groupKey
});

/**
 * Removing groups from selection
 */
export const removeAggGroup = groupKey => ({
  type: "REMOVE_AGG_GROUP",
  groupKey
});
