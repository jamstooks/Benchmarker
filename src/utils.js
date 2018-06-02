/**
  If the item is in the array, you want it removed.
  If the item isn't in the array, you want to add it.
  
  The function should not mutate the original array,
  but return a new one.
*/
export const addOrRemove = (array, objToAddOrRemove, compareMethod) => {
  if (array.length === 0) {
    return [objToAddOrRemove];
  }

  let filteredArray = array.filter(o => {
    return !compareMethod(o, objToAddOrRemove);
  });

  return filteredArray.length !== array.length
    ? filteredArray
    : [...array, objToAddOrRemove];
};
