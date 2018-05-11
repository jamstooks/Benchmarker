const entities = (state = [], action) => {
  switch (action.type) {
    case "ADD_ENTITY":
      return [...state, action.entity];
    case "REMOVE_ENTITY":
      return state.filter(e => {
        return e.id != action.entity.id;
      });
    default:
      return state;
  }
};

export default entities;
