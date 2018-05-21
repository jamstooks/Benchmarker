/**
 * Adding a filter to the selected filters
 */
export const selectDataFilter = (key, value) => ({
  type: "SELECT_DATA_FILTER",
  key,
  value
});

/**
 * Removing a filter for data
 */
export const removeDataFilter = key => ({
  type: "REMOVE_DATA_FILTER",
  key
});

/**
 * Request that filters get updated starting at a
 * specific filter. This will start the update for
 * all the children of this filter
 */
export const startFilterUpdate = (key, parentKey, parentValue) => ({
  type: "START_FILTER_UPDATE",
  key,
  parentKey,
  parentValue
});

/**
 * Receive the updated choices for a filter by key
 * and reset any children as necessary
 */
export const recieveFilterChoices = (key, items) => ({
  type: "RECIEVE_FILTER_CHOICES",
  key,
  items
});

/**
 * Updates all filter values as necessary when
 * a specific filter's value changes
 */
export function updateFilters(key, parentKey, parentValue) {
  return function(dispatch) {
    dispatch(startFilterUpdate(key, parentKey, parentValue));

    if (key != undefined) {
      let url = "https://api.myjson.com/bins/1hcbbu";
      return fetch(url)
        .then(
          response => response.json(),
          error => console.log("An error occurred.", error)
        )
        .then(json => {
          console.log("parent val");
          console.log(parentValue);
          console.log(key);
          console.log(json);
          let items =
            parentValue != undefined
              ? json[key][parentValue]
              : json[key]["default"];
          dispatch(recieveFilterChoices(key, items));
        });
    }
  };
}
